<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let windowW
			let windowH
			uni.getSystemInfo({
				success: function(res) {
					windowH = res.windowHeight
					windowW = res.windowWidth
				}
			})
			this.$store.commit('setWidth', windowW)
			this.$store.commit('setHeight', windowH)
			console.log(this.$store.state.windowWidth)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
    @import './common/animate.css';
    @import './common/common.css';
    @import './common/icon.css';
    @import './common/uni.css';
</style>
