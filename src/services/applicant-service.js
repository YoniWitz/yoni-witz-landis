import { http } from './http-service'

export function getAllApplicants() {
    return http().get('/applicant');
}

export function getApplicantById(id) {
    return http().get(`/applicant/${id}`);
}

export function createApplicant(applicant) {
    return http().post('/applicant', applicant)
        .then()
        .catch(error => error.response.data.message);
}

export function deleteApplicant(id) {
    return http().delete(`/applicant/${id}`);
}

export function updateApplicant(applicant) {
    return http().put('/applicant', applicant).then()
        .catch(error => error.response.data.message);
}