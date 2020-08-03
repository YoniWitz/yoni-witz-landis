<template>
  <div>
    <h1>Create Applicant</h1>
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
        <button type="submit" class="btn btn-secondary">Create</button>
      </div>
    </form>
  </div>
</template>


<script>
import * as applicantService from "../../services/applicant-service";
export default {
  name: "applicants-create",
  data: function () {
    return {
      applicant: {
        name_first: "",
        comments: "",
      },
    };
  },
  methods: {
    onSubmit: async function () {
      const request = {
        applicant: this.applicant,
      };
      await applicantService.createApplicant(request);
      this.$router.push({ name: "Applicants-All" });
    },
  },
};
</script>