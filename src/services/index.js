import axios from 'axios'
const host = 'https://44c63a76-69a2-41f9-b8c6-12b9af85bde9.bspapp.com'
// const host = ''
export const queryClassifications = async () => {
	const {
		data
	} = await axios.get(host + '/getTypes')
	return data;
}

export const queryWallList = async (id, start) => {
	const {
		data
	} = await axios.get(host + `/getWallpaper?cid=${id}&start=${start}`)
	return data;
}
