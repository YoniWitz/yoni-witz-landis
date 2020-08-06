<template>
  <div class="d-flex flex-column">
    <h1 class="mb-4"><b>{{applicant.name_first}} {{applicant.name_last}}    </b>      
        <router-link class="card-link btn btn-success" to="/applicants" exact>Back</router-link>
    </h1>
    <b-container class="applicant-view">
      <b-row>
        <b-col><b>Employer</b> : {{applicant.employer}}</b-col>
        <b-col><b>Date Created</b> : {{applicant.createdAt}}</b-col>
        <b-col><b>Credit</b> : {{applicant.credit}}</b-col>
        <b-col><b>Balance</b> : {{applicant.balance}}</b-col>
        <div class="w-100"></div>
        
        <b-col><b>Email</b> : {{applicant.email}}</b-col>
        <b-col><b>Phone</b> : {{applicant.phone}}</b-col>
        <b-col><b>Address</b> : {{applicant.address}}</b-col>
        <div class="w-100"></div>
        <b-col>
          <div class="form-group">
            <label><b>Comments:</b></label>
            <textarea
              v-model="applicant.comments"
              class="form-control"
              disabled
            />
          </div>
        </b-col>
        <div class="w-100"></div>
        <b-col>
          <b>Tags:</b>
          <span v-for="(tag, index) in applicant.tags" v-bind:key="index" >          
            {{tag}},      
          </span>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import * as applicantService from "../../services/applicant-service";
import moment from "moment";

export default {
  name: "applicants-view",
  data: function () {
    return {
      applicant: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    applicantService.getApplicantById(to.params.id).then((res) => {
      if (!res) {
        next("/applicants");
      } else {
        next((vm) => {
          const applicant = res.data.applicant;
          applicant.createdAt = moment(applicant.createdAt).format("YYYY-MM-DDD");
          vm.applicant = applicant;
        });
      }
    });
  },
};
</script>