import axios from "axios";
import { BASE_URL } from "../config/constants";
import { sampleTestRegistrations } from "../app/test/data/testRegistration";
import { COVID_RESULTS } from "../app/constants";
import {
  mapApiKeysToFrontendKeys,
  testRegistrationMapping,
  testResultMapping,
  isLocalHost,
} from "../helpers";

export const getTestRegistrations = async (organizationId) => {
  if (isLocalHost) {
    const url = `http://localhost:8000${BASE_URL}/test_registrations`;
    const response = await axios.get(url);
    const rawTestRegistrations = response.data.items;
    const testRegistrations = rawTestRegistrations.map((rawTestRegistration) =>
      mapApiKeysToFrontendKeys(rawTestRegistration, testRegistrationMapping)
    );
    return testRegistrations;
  }
  return sampleTestRegistrations;
};

export const getTestResult = async (testRegistrationId) => {
  if (isLocalHost) {
    const url = `http://localhost:8000${BASE_URL}/test_results`;
    const response = await axios.get(url);
    const rawTestResults = response.data.items;
    const testResults = rawTestResults.map((rawtestResult) =>
      mapApiKeysToFrontendKeys(rawtestResult, testResultMapping)
    );
    const testResult = testResults.find(
      (testResult) => testResult.testRegistrationId == testRegistrationId
    );
    return testResult;
  }
  return {
    testResult: COVID_RESULTS.DETECTED,
    ...sampleTestRegistrations.find(
      (sampleTestRegistration) =>
        sampleTestRegistration.testRegistrationId === testRegistrationId
    ),
  };
};
