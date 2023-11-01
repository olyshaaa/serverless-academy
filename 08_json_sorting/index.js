const axios = require('axios')

const endpoints = [
    'https://jsonbase.com/sls-team/json-793',
    'https://jsonbase.com/sls-team/json-955',
    'https://jsonbase.com/sls-team/json-231',
    'https://jsonbase.com/sls-team/json-931',
    'https://jsonbase.com/sls-team/json-93',
    'https://jsonbase.com/sls-team/json-342',
    'https://jsonbase.com/sls-team/json-770',
    'https://jsonbase.com/sls-team/json-491',
    'https://jsonbase.com/sls-team/json-281',
    'https://jsonbase.com/sls-team/json-718',
    'https://jsonbase.com/sls-team/json-310',
    'https://jsonbase.com/sls-team/json-806',
    'https://jsonbase.com/sls-team/json-469',
    'https://jsonbase.com/sls-team/json-258',
    'https://jsonbase.com/sls-team/json-516',
    'https://jsonbase.com/sls-team/json-79',
    'https://jsonbase.com/sls-team/json-706',
    'https://jsonbase.com/sls-team/json-521',
    'https://jsonbase.com/sls-team/json-350',
    'https://jsonbase.com/sls-team/json-64'
  ];


  async function fetchData(endpoint) {
    for (let retry = 0; retry < 3; retry++) {
      try {
        const response = await axios.get(endpoint);
        if (response.data.isDone !== undefined) {
          console.log(`[Success] ${endpoint}: isDone - ${response.data.isDone}`);
          return true;
        }
      } catch (error) {
        console.error(`[Retry ${retry + 1}] ${endpoint}: ${error.message}`);
      }
    }
    console.error(`[Fail] ${endpoint}: The endpoint is unavailable`);
    return false;
  }

  (async () => {
    let trueCount = 0;
    let falseCount = 0;

    for (const endpoint of endpoints) {
      const result = await fetchData(endpoint);

      if (result) {
        result ? (trueCount += 1) : (falseCount += 1);
      }
    }

    console.log(`Found True values: ${trueCount}`);
    console.log(`Found False values: ${falseCount}`);
  })();