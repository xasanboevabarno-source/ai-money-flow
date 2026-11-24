import { existsSync } from 'node:fs';
if (existsSync('.env.local')) process.loadEnvFile('.env.local');
import('../lib/db').then(({init})=>init()).then(()=>console.log('База данных подготовлена')).catch(error=>{console.error(error);process.exitCode=1});
