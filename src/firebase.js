//firebase.js
import firebase from "firebase/app"
const config = {
	apiKey: "AIzaSyDOq1PSeXSWgKaT9gtqFhYLDp2XaI8vSyg",
	authDomain: "fir-test-1d3b9.firebaseapp.com",
	databaseURL: "https://fir-test-1d3b9.firebaseio.com",
	projectId: "fir-test-1d3b9",
	storageBucket: "fir-test-1d3b9.appspot.com",
	messagingSenderId: "259671001341"
}

firebase.initializeApp(config)

export default firebase