// @ts-ignore
import { load } from 'https://deno.land/std@0.202.0/dotenv/mod.ts';
// @ts-ignore
import { encode as base64 } from 'https://deno.land/std@0.82.0/encoding/base64.ts';
import cache from './memory-cache.js';

const PORT = 5000;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const CACHE_DURATION = 1*MINUTE;


type Config = {
  [id: string]: string;
}
const dotenv = await load();
const config: Config = {};

for (const variable of ['MAILCHIMP_SERVER', 'MAILCHIMP_API_KEY', 'MAILCHIMP_LIST_ID']) {
  // @ts-ignore
  config[variable] = Deno.env.get(variable) ?? dotenv[variable];
}

console.log('Startin 🦕 deno...');
console.log('MAILCHIMP_SERVER=', config.MAILCHIMP_SERVER);
console.log('MAILCHIMP_API_KEY=', config.MAILCHIMP_API_KEY);
console.log('MAILCHIMP_LIST_ID=', config.MAILCHIMP_LIST_ID);

const auth = 'Basic ' + base64(`user:${config.MAILCHIMP_API_KEY}`);

console.log('auth=', auth);

cache.put('foo', 'bar');

const getStats = async () => {
  const url = `https://${config.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${config.MAILCHIMP_LIST_ID}?fields=id,name,stats`;
  const cached = cache.get(url);
  if (cached) return cached;

  // Nothing cached? Go ahead and fetch
  console.log(`GET ${url}`);
  const headers = { Authorization: auth };
  const response = await fetch(url, { headers });
  console.log(`${response.status} ${response.statusText}`);
  const data = await response.json();
  const stats = data?.stats;

  // Use cache and return
  cache.put(url, stats, CACHE_DURATION);
  return stats;
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
};

const handler = async (request: Request): Promise<Response> => {
  const {member_count, last_sub_date} = await getStats();
  return new Response(JSON.stringify({member_count, last_sub_date}), { headers, status: 200 });
};

console.log(`HTTP server running. Access it at: http://localhost:${PORT}/`);

// @ts-ignore
Deno.serve({ port: PORT }, handler);

