<template>
    <div>
        <top_nav />
        test me
        <router-link to="/mine">mine</router-link>
        <img src="~static/img/papers/1-1.png">
    </div>
</template>
<script>
    export default {
        created () {
            console.log("tab: ", this.$route);
            this.$model.home()
                .then(data => {
                    console.log("data: ", data);
                });
        }
    }
</script>
<style lang="less" scoped>
	div {
		width: 400/@base;
	}
</style>