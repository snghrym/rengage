import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC5c_mdvsEHCia1wf_lqCaIZQWS8lBh9Bk',
  authDomain: 'resume-7a6c3.firebaseapp.com',
  databaseURL: 'https://resume-7a6c3.firebaseio.com',
  messagingSenderId: '103183460643',
  storageBucket: 'resume-7a6c3.appspot.com',
};


class Auth {
  private instance: firebase.app.App;

  constructor() {
    this.instance = firebase.initializeApp(config);
  }

  get isSigned(): boolean {
    return this.instance.auth().currentUser !== null;
  }

  get isSignedAdmin(): boolean {
    return this.isSigned && this.instance.auth().currentUser.emailVerified;
  }

  get isSignedCustomer(): boolean {
    return this.isSigned && this.instance.auth().currentUser.isAnonymous;
  }

  get uid(): string | null {
    return this.isSigned ? this.instance.auth().currentUser.uid : null;
  }

  get isResumeAccpeted(): boolean {
    if (!this.isSignedCustomer) {
      return false;
    }
    const isResumeAcceptedRefs: firebase.database.Reference =
      firebase.database().ref(`applicate/${this.uid}/isResumeAccepted`);

    isResumeAcceptedRefs.on('value', snapshot => {
      if (!snapshot.val()) {
        return false;
      }
    });
    return true;
  }

}

export default firebase;
export const auth: Auth = new Auth();
