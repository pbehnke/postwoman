import axios from "axios"

const axiosWithProxy = async (req, { state }) => {
  var proxyAuthToken = state.postwoman.settings.PROXY_KEY || "";
  if(proxyAuthToken) {
    req['AccessToken'] = proxyAuthToken;
  }
  const { data } = await axios.post(
    state.postwoman.settings.PROXY_URL || "https://postwoman.apollosoftware.xyz/",
    req
  )
  return data
}

const axiosWithoutProxy = async (req, _store) => {
  const res = await axios(req)
  return res
}

const axiosStrategy = (req, store) => {
  if (store.state.postwoman.settings.PROXY_ENABLED) {
    return axiosWithProxy(req, store)
  }
  return axiosWithoutProxy(req, store)
}

export default axiosStrategy
