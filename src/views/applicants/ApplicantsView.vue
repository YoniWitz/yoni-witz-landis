<template>
  <div class="applicant-view d-flex flex-column">
    <h1 class="mb-4">
      <b>{{applicant.name_first}} {{applicant.name_last}} &nbsp;</b>
      <router-link class="card-link btn btn-success" to="/applicants" exact>Back</router-link>
    </h1>
    <b-container>
      <b-row>
        <b-col>
          <b>Employer</b>
          : {{applicant.employer}}
        </b-col>
        <b-col>
          <b>Date Applied</b>
          : {{applicant.createdAt}}
        </b-col>
        <b-col>
          <b>Credit</b>
          : {{applicant.credit}}
        </b-col>
        <b-col>
          <b>Balance</b>
          : {{applicant.balance}}
        </b-col>
        <div class="w-100"></div>

        <b-col>
          <b>Email</b>
          : {{applicant.email}}
        </b-col>
        <b-col>
          <b>Phone</b>
          : {{applicant.phone}}
        </b-col>
        <b-col>
          <b>Address</b>
          : {{applicant.address}}
        </b-col>
        <div class="w-100"></div>
        <b-col>
          <div class="form-group">
            <label>
              <b>Comments:</b>
            </label>
            <textarea v-model="applicant.comments" class="form-control" disabled />
          </div>
        </b-col>
        <div class="w-100"></div>
        <b-col>
          <b>Tags:&nbsp;</b>
          <span v-for="(tag, index) in applicant.tags" v-bind:key="index">{{tag}},</span>
        </b-col>
      </b-row>
    </b-container>
    <div class="chart">
      <b>Number of Successful Applicants by month they initially Applied:</b>
      <pure-vue-chart
        v-if="display"
        :points="points"
        :show-x-axis="true"
        :width="400"
        :height="200"
        :show-values="true"
        :use-month-labels="true"
      />
      <div v-else>No successful applicants</div>
    </div>
  </div>
</template>

<script>
import * as applicantService from "../../services/applicant-service";
import moment from "moment";
import PureVueChart from "pure-vue-chart";

export default {
  components: {
    PureVueChart,
  },
  name: "applicants-view",
  computed: {
    display: function () {
     return !this.points.every(item => item === 0);
    },
  },
  data: function () {
    return {
      points: [],
      months:
        "['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']",
      applicant: {},
    };
  },
  async beforeRouteEnter(to, from, next) {
    console.log(from, next);
    const applicantPromise = applicantService.getApplicantById(to.params.id);
    const analysisPromise = applicantService.getApplicantsAnalysis();
    await Promise.all([applicantPromise, analysisPromise]).then((res) => {
      if (!res) {
        next("/applicants");
      } else {
        next((vm) => {
          const applicant = res[0].data.applicant;
          applicant.createdAt = moment(applicant.createdAt).format(
            "YYYY-MM-DDD"
          );
          vm.applicant = applicant;
          vm.points = res[1].data;
        });
      }
    });
  },
};
</script>