import { defineConfig } from '@playwright/test'
export default defineConfig({testDir:'./tests',timeout:45000,workers:1,use:{baseURL:'http://127.0.0.1:5173',channel:'chrome',headless:true},reporter:[['list'],['json',{outputFile:'qa/repair/test-results.json'}]]})
