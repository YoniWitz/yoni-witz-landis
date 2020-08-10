<template>
  <div class="d-flex flex-column">
    <h1 class="mb-4">Applicants</h1>
    <div class="mb-4">
      <router-link to="/applicants/create" class="btn btn-success ml-2" exact>Create Applicant</router-link>
    </div>
    <div v-if="applicants && applicants.length > 0" class="d-flex flex-wrap justify-content-start">
      <div
        v-for="applicant in applicants"
        v-bind:key="applicant._id"
        class="card mb-2 ml-2text-white bg-dark"
        style="width: 18rem;"
      >
        <b-card
          v-bind:img-src="applicant.picture"
          style="max-width: 20rem;"
          class="mb-2"
          alt="https://i.pravatar.cc/303"
        />
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">Full Name: {{ applicant.name_first }} {{ applicant.name_last }}</h5>
          </div>

          <div class="card-subtitle mb-2 text-muted">
            <b>Progress:</b>
            <b-progress :max="max">
              <b-progress-bar
                :value="applicant.value"
                :label="`${((applicant.value / max) * 100)}%`"
                striped
              ></b-progress-bar>
            </b-progress>
          </div>
          <div class="d-flex justify-content-between">
            <router-link
              type="button"
              tag="button"
              class="card-link btn btn-primary"
              :to="{name:'Applicants-Edit', params:{id:applicant._id}}"
              exact
            >Edit</router-link>
            <router-link
              type="button"
              tag="button"
              class="card-link btn btn-success"
              :to="{name:'Applicants-View', params:{id:applicant._id}}"
              exact
            >View</router-link>
            <a
              v-on:click.prevent="currentApplicantId = applicant._id"
              href="#"
              class="card-link btn btn-danger"
              v-b-modal.deletemodal
            >Delete</a>
          </div>
        </div>
      </div>

      <div>
        <b-modal id="deletemodal" ref="modal" centered title="Delete Confirmation">
          <p class="my-4">Are You Sure?</p>
          <div slot="modal-footer" class="w-100 text-right">
            <b-btn slot="md" class="mr-1" variant="danger" @click="deleteApplicant">Delete</b-btn>
            <b-btn slot="md" variant="secondary" @click="cancelModal">Cancel</b-btn>
          </div>
        </b-modal>
      </div>
    </div>

    <div v-else class="ml-2">
      <div class="alert alert-info">No Applicants Found</div>
    </div>
  </div>
</template>

<script>
import * as applicantService from "../../services/applicant-service";

export default {
  name: "applicants-all",
  data: function () {
    return {
      max: 100,
      applicants: null,
      currentApplicantId: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    applicantService.getAllApplicants().then((res) => {
      next((vm) => {
        res.data.applicants.forEach(
          (applicant) =>
            {
              let value = Math.floor(applicant.credit / 10 + applicant.balance / 100 
              + (applicant.employer ? 10 : 0));
              applicant.value = value > 100 ? 100 : value;
              }
        );
        vm.applicants = res.data.applicants;
      });
    });
  },

  methods: {
    obtainedMortgage: function () {},
    cancelModal: function () {
      this.$refs.modal.hide();
      this.currentApplicantId = null;
    },
    deleteApplicant: async function () {
      this.$refs.modal.hide();
      await applicantService.deleteApplicant(this.currentApplicantId);
      const index = this.applicants.findIndex(
        (applicant) => applicant._id === this.currentApplicantId
      );
      this.applicants.splice(index, 1);
      this.currentApplicantId = null;
    },
  },
};
</script>