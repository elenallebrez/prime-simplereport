import { MULTIPLEX_DISEASES, TEST_RESULTS } from "../testResults/constants";

function getTestResult(result: MultiplexResult): TestResult {
  if (result) {
    if ("testResult" in result) {
      return result.testResult;
    }
  }
  return "UNKNOWN";
}

export function getResultObjByDiseaseName(
  results: MultiplexResults,
  diseaseName: MultiplexDisease
): MultiplexResult {
  return (
    (results.find((result: MultiplexResult) => {
      return result.disease.name.includes(diseaseName);
    }) as MultiplexResult) || null
  );
}

export function getResultByDiseaseName(
  results: MultiplexResults,
  diseaseName: MultiplexDisease
): string {
  const result = getResultObjByDiseaseName(results, diseaseName);
  return getTestResult(result) || "UNKNOWN";
}

export function getSortedResults(results: MultiplexResults): MultiplexResults {
  return Object.values(results).sort(
    (a: MultiplexResult, b: MultiplexResult) => {
      return a.disease.name.localeCompare(b.disease.name);
    }
  );
}

export function hasMultipleResults(results: MultiplexResults): boolean {
  return results?.length > 1;
}

export function hasPositiveFluResults(results: MultiplexResults): boolean {
  return (
    results.filter(
      (multiplexResult: MultiplexResult) =>
        multiplexResult.disease.name.includes("Flu") &&
        getTestResult(multiplexResult) === TEST_RESULTS.POSITIVE
    ).length > 0
  );
}

export function hasDiseaseSpecificResults(
  results: MultiplexResults | null,
  diseaseName: MultiplexDisease
): boolean {
  if (results) {
    return results.map((result) => result.disease.name).includes(diseaseName);
  }
  return false;
}

export function hasPositiveRsvResults(results: MultiplexResults): boolean {
  return (
    results.filter(
      (multiplexResult: MultiplexResult) =>
        multiplexResult.disease.name.includes("RSV") &&
        getTestResult(multiplexResult) === TEST_RESULTS.POSITIVE
    ).length > 0
  );
}

export const getModifiedResultsForGuidance = (results: MultiplexResults) => {
  const positiveFluResults = results.filter(
    (r) =>
      r.disease.name.includes("Flu") && r.testResult === TEST_RESULTS.POSITIVE
  );
  if (positiveFluResults.length > 1) {
    // remove one positive flu result if both are positive to avoid flu guidance duplication
    const fluResultsSet = new Set([positiveFluResults[0]]);
    results = results.filter((r) => !fluResultsSet.has(r));
  }
  return getSortedResults(results);
};

export const displayGuidance = (results: MultiplexResults) => {
  return (
    hasDiseaseSpecificResults(results, MULTIPLEX_DISEASES.COVID_19) ||
    hasPositiveFluResults(results) ||
    hasPositiveRsvResults(results)
  );
};
