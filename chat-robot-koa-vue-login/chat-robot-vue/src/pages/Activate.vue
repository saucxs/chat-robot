<template>
<!--  登录 -->
<div class="activate">
	<div class="wrapper fadeInDown">
		<div id="formContent">
			<h2 class="active"> 激活 </h2>
			<div class="fadeIn first">
        <svg id="icon" class="icon" alt="User Icon" aria-hidden="true">
          <use xlink:href="#iconliaotian"></use>
        </svg>
			</div>
      <p class="text active">{{message}}</p>
		</div>
	</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	name: "activate",
	props: {},
	components: {},
	data() {
		return {
			code: this.$route.params.code,
      message: ''
		};
	},
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      let data = {
        code: vm.code
      }
      vm.activateEmail(data).then(res => {
        if (res) {
          vm.message = res.message;
        }
      }).catch(err => {
        this.$message({
          message: '服务器出错啦',
          type: "error"
        });
      })
    });
  },
	methods: {
    ...mapActions(["activateEmail"]),
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/css/activate.scss";
</style>
