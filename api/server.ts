// @ts-ignore
import { load } from 'https://deno.land/std@0.202.0/dotenv/mod.ts';
// @ts-ignore
import { encode as base64 } from 'https://deno.land/std@0.82.0/encoding/base64.ts';
import cache from './memory-cache.js';

const env = await load();
const port = 5000;
const SECOND = 1000;
const MINUTE = 60 * SECOND;

console.log('Startin 🦕 deno...');
console.log('MAILCHIMP_SERVER=', env.MAILCHIMP_SERVER);
console.log('MAILCHIMP_API_KEY=', env.MAILCHIMP_API_KEY);
console.log('MAILCHIMP_LIST_ID=', env.MAILCHIMP_LIST_ID);

const auth = 'Basic ' + base64(`user:${env.MAILCHIMP_API_KEY}`);

console.log('auth=', auth);

cache.put('foo', 'bar');

const getStats = async () => {
  const url = `https://${env.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_LIST_ID}?fields=id,name,stats`;
  const cached = cache.get(url);
  if (cached) return cached;

  // Nothing cached? Go ahead and fetch
  console.log(`GET ${url}`);
  const headers = { Authorization: auth };
  const response = await fetch(url, { headers });
  console.log(`${response.status} ${response.statusText}`);
  const data = await response.json();
  const stats = data?.stats;

  // Use a 5 minute cache and return
  cache.put(url, stats, 5*MINUTE);
  return stats;
};

const handler = async (request: Request): Promise<Response> => {
  const {member_count, last_sub_date} = await getStats();
  return new Response(JSON.stringify({member_count, last_sub_date}), { status: 200 });
};

console.log(`HTTP server running. Access it at: http://localhost:8080/`);

// @ts-ignore
Deno.serve({ port }, handler);

