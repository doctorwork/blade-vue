<template>
    <div>
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
	
</style>