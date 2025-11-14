<template>
  <div class="page-wrapper">
    <Header />
    <MainComp />
    <WeekIdeas />
    <HowItWorks />
    <PolicyAndContacts />
    <CompanyPolicy />
    <!-- <ProblemForm /> -->
  </div>
</template>

<script setup>
import Header from '../views/Header.vue'
import MainComp from '../views/MainComp.vue'
import WeekIdeas from './WeekIdeas.vue'
import HowItWorks from './HowItWorks.vue'
import PolicyAndContacts from './PolicyAndContacts.vue'
import CompanyPolicy from './CompanyPolicy.vue'
import ProblemForm from './ProblemForm.vue'
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  min-height: 100vh;
}
</style>
