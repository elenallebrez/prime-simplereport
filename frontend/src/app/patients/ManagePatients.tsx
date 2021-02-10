import { gql, useQuery } from "@apollo/client";
import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { displayFullName } from "../utils";

import {
  PATIENT_TERM,
  PATIENT_TERM_PLURAL_CAP,
} from "../../config/constants";
import { daysSince } from "../utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PatientUpload from "./PatientUpload";

const patientQuery = gql`
  query GetPatientsByFacility($facilityId: String!) {
    patients(facilityId: $facilityId) {
      internalId
      lookupId
      firstName
      lastName
      middleName
      birthDate
      lastTest {
        dateAdded
      }
    }
  }
`;

interface Patient {
  internalId: string;
  lookupId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  lastTest: {
    dateAdded: string;
  };
}

interface Data {
  patients: Patient[];
}

interface Props {
  activeFacilityId: string;
  canEditUser: boolean;
}

const ManagePatients = ({ activeFacilityId, canEditUser }: Props) => {
  const { data, loading, error, refetch } = useQuery<Data, {}>(patientQuery, {
    fetchPolicy: "no-cache",
    variables: {
      facilityId: activeFacilityId,
    },
  });

  const patientRows = (patients: Patient[]) => {
    return patients.map((patient: Patient) => {
      let fullName = displayFullName(
        patient.firstName,
        patient.middleName,
        patient.lastName
      );

      let editUserLink = canEditUser ? (
        <NavLink
          to={`/patient/${patient.internalId}?facility=${activeFacilityId}`}
        >
          {fullName}
        </NavLink>
      ) : (
        <span>{fullName}</span>
      );

      return (
        <tr key={patient.internalId}>
          <th scope="row">{editUserLink}</th>
          <td>{patient.lookupId}</td>
          <td> {patient.birthDate}</td>
          <td>
            {patient.lastTest
              ? `${daysSince(moment(patient.lastTest.dateAdded))}`
              : "N/A"}
          </td>
        </tr>
      );
    });
  };

  return (
    <main className="prime-home">
      <div className="grid-container">
        <div className="grid-row">
          <div className="prime-container usa-card__container">
            <div className="usa-card__header">
              <h2>{PATIENT_TERM_PLURAL_CAP}</h2>
              {canEditUser ? (
                <NavLink
                  className="usa-button usa-button--outline"
                  to={`/add-patient/?facility=${activeFacilityId}`}
                  id="add-patient-button"
                >
                  <FontAwesomeIcon icon="plus" />
                  {` Add ${PATIENT_TERM}`}
                </NavLink>
              ) : null}
            </div>
            <div className="usa-card__body">
              {error ? (
                <p>Error in loading patients</p>
              ) : loading ? (
                <p>Loading patients...</p>
              ) : data ? (
                <table className="usa-table usa-table--borderless width-full">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Unique ID</th>
                      <th scope="col">Date of birth</th>
                      <th scope="col">Days since last test</th>
                    </tr>
                  </thead>
                  <tbody>{patientRows(data.patients)}</tbody>
                </table>
              ) : (
                <p> no patients found</p>
              )}
            </div>
          </div>
          <PatientUpload onSuccess={refetch} />
        </div>
      </div>
    </main>
  );
};

export default ManagePatients;
