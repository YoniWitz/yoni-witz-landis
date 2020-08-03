<template>
  <div>
    <h1>Edit Applicant</h1>
    <form class="custom-form" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="firstname">First name</label>
        <input
          v-model="applicant.name_first"
          type="text"
          class="form-control"
          id="firstname"
          placeholder="First Name"
          name="firstname"
        />
      </div>
      <div class="form-group">
        <label for="comments">Comments</label>
        <textarea
          v-model="applicant.comments"
          class="form-control"
          id="comments"
          placeholder="Comments"
          name="comments"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-secondary">Update</button>
      </div>
    </form>
  </div>
</template>


<script>
import * as applicantService from "../../services/applicant-service";
import moment from "moment";
export default {
  name: "applicants-edit",
  data: function () {
    return {
      applicant: {
        name_first: "",
        comments: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    applicantService.getApplicantById(to.params.id).then((res) => {
      if (!res) {
        next("/applicants");
      } else {
        next((vm) => {
          const applicant = res.data.applicant;
          applicant.created = moment(applicant.cretaed).format("YYYY-MM-DDD");
          vm.applicant = applicant;
        });
      }
    });
  },
  methods: {
    onSubmit: async function () {
      const request = {
        applicant: this.applicant,
      };
      await applicantService.updateApplicant(request);
      this.$router.push({ name: "Applicants-All" });
    }
  }
};
</script>