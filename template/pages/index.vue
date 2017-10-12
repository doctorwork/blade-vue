<template>
    <div>
        <top_nav />
        <router-link to="/mine">mine</router-link>
    </div>
</template>
<script>
    export default {
        created () {
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