<template>
  <div>
    <h1>Edit Applicant</h1>
    <form class="custom-form" v-on:submit.prevent="checkForm">
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
        <label for="lastname">Last name</label>
        <input
          v-model="applicant.name_last"
          type="text"
          class="form-control"
          id="lastname"
          placeholder="Last Name"
          name="lastname"
        />
      </div>
      <div class="form-group">
        <label for="balance">Balance</label>
        <input
          v-model="applicant.balance"
          type="number"
          class="form-control"
          id="balance"
          placeholder="Balance"
          name="balance"
          step="0.01"
          value="0.00"
        />
      </div>
      <div class="form-group">
        <label for="credit">Credit</label>
        <input
          v-model="applicant.credit"
          type="number"
          class="form-control"
          id="credit"
          placeholder="Credit"
          name="credit"
        />
      </div>
      <div class="form-group">
        <label for="picture">Picture</label>
        <input
          v-model="applicant.picture"
          type="url"
          class="form-control"
          id="picture"
          placeholder="Picture"
          name="picture"
        />
      </div>
      <div class="form-group">
        <label for="employer">Employer</label>
        <input
          v-model="applicant.employer"
          type="text"
          class="form-control"
          id="employer"
          placeholder="Employer"
          name="employer"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="applicant.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Email"
          name="email"
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          v-model="applicant.phone"
          type="tel"
          class="form-control"
          id="phone"
          placeholder="Phone"
          name="phone"
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input
          v-model="applicant.address"
          type="text"
          class="form-control"
          id="address"
          placeholder="Address"
          name="address"
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
      <div v-if="errors.length" class="btn-danger ml-2">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
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
      errors: [],
      applicant: {
        balance: 0,
        credit: 0,
        picture: "",
        name_first: "",
        name_last: "",
        employer: "",
        email: "",
        phone: null,
        address: "",
        comments: "",
        tags: [],
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
    checkForm: function (e) {
      this.errors = [];

      if (!this.applicant.balance) {
        this.errors.push("Balance required");
      }
      if (!this.applicant.credit) {
        this.errors.push("Credit required.");
      }
      if (!this.applicant.picture) {
        this.errors.push("Picture required");
      }
      if (!this.applicant.name_first) {
        this.errors.push("First name required.");
      }
      if (!this.applicant.name_last) {
        this.errors.push("Last name required");
      }
      if (!this.applicant.email) {
        this.errors.push("Email required");
      } else if (!this.validEmail(this.applicant.email)) {
        this.errors.push("Valid email required.");
      }
      if (!this.applicant.phone) {
        this.errors.push("Phone required.");
      }
      if (!this.applicant.address) {
        this.errors.push("Address required");
      }

      if (!this.errors.length) {
        this.editApplicant();
      }

      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    editApplicant: async function () {
      const request = {
        applicant: this.applicant,
      };
      await applicantService.updateApplicant(request);
      this.$router.push({ name: "Applicants-All" });
    },
  },
};
</script>