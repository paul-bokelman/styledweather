import firebase from "./firebase";
const db = firebase.firestore();
export const handleSignup = (email, password) => {
  // {email, password}
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const ref = db.collection("users").doc(user.uid);
      console.log(user);
      ref
        .set({
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          idealWeather: "Temp: 48F",
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // ..
    });
};

export const handleSignin = (email, password) => {
  // {email, password}
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const ref = db.collection("users").doc(user.uid);
      console.log(user.uid);

      ref
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};
