import axios from 'axios';

class API {
	constructor() {

	}

	async Request(url) {
		this.onStart()

		try {
			const response = await axios({url});
			const {data} = response;
			if (data) {
				this.onSuccess(data)
			}
			return data;
		} catch (axiosError) {
			if (axiosError.response) {
				this.onResponseError(axiosError.response)
			} else if (axiosError.request) {
				this.onRequestError(axiosError.request)
			} else {
				this.onError(axiosError.message)
			}
		} finally {
			this.onFinish()
		}
	}

	onSuccess(data) {
		//console.log(data)
	}

	onResponseError(responseError) {

	}

	onRequestError(requestError) {

	}

	onError(error) {

	}

	onStart() {

	}

	onFinish() {

	}
}

export default API