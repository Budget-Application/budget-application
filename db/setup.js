import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const appCredentials = {
  type: "service_account",
  project_id: "budget-application-ea8df",
  private_key_id: "3080237b408db6453aa928b0c731bcd3198f8b55",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLsh5W5uEFAdv4\nqIoOTZu9UTLwAaI/oLRHsQsovKem1mHPM72MVHwlRTkFV7AKzL1jG/QfaoQhsvBF\nXRrTSHX3fQQlkTUprndJ587mxc2YmDq/FPEJZN37erD1OnUfkUc25+ZoS09P7msy\n6Uw7VQ4umMnuEBNw7Uz+sHGnwSC/d5IBP5YUQyV+qRONEsE2naEfNQKP8mfmqhRB\na9fwxPbMDZVNloHYly5VrVG9WcDcK9CaRQURuiOI2h1Qoe79hCOiU8lsYJyow6m0\nhagipuxgf3gH6lwTIUsWRZg2Elmqk2a8HEjbCzV/GJfX09TKi0E/Jyw1AMvtXlvD\nr2DKogzdAgMBAAECggEAIGWDmEgvpSt6yBVMIcK7oJRTwOLNooeFbLqOfwvkMS97\nDmiY/sLoHMhh7YTZAZq3C1aEkOOQwMhUGQAaFlz5sCNAv9XUqfyuycEVwdPXY2vg\nugfTXy5c9NR6ZQJHYv4o4KVo2pERu/F8OLRstKoOL6CKyzNg2C7RtlcrOGZJtlG+\nML0SzI3HZsxKq+n3PZrsuw3XdWh6m2VLp3bvCUVP2hvvjMgdt4wZgE02Axrj4KhC\nz3Wect4IXhrMoNEbRJV4giJqhcl4Zp8aQHi6LELQ1nOKr3dz/fZWbFAc7jfVJoB4\nZa7b4Nyk7VmihFDi7SPXA/9IC/kLEWDyu1mb9H26yQKBgQDnZzAMRkF9OP9ehdKf\nJbDz3O+FGG1DOZNB4a4lCLUzvzWrq+iUbpeM5F5RRypyLi1YmJmg6R44VuEEtMLV\n4+fZvNTQ9KT/Ll5MbFNH0NV41g0imuDd6cv2KuGxYLDgc+If8vuvAE9w0ObBV0RW\n8SGk9TkQjE9Uy3rmeKYd1fPlCQKBgQDhWPmfj+ppc18Rj56D44U51/QYq7G4XII0\ngVAicWB1X5rrPbbUonlHCbURQ/q8buHpcJetda+6JQHT6qABmN1gt3pGkji1lo3w\n/8sCirZ5sVp2tIXpPCUK4NQOqZhhtQp4aZfUDRtAmCZuzYw2hNNrWyVWW7/KDOtr\nUHGB1AESNQKBgDtyIsHEeqZ0sgXSUx1XTXIYW9/ROqB+dfoCw/33krVMdbk4XHNl\nRcGIGULACYNzoWqVKUJRINZQW1YeKb9Q4Qrqm7FiZ9C2VLtFSM+2MmDsfEtbhlD7\n8s22jmxG7ql6m6ihf06hwca1o9IfXQsIvx/lb1d09BxQea4jaGlZwWIhAoGBAMT1\noJCPGCJ83U4bCkBaXzp0fvwFLTtnV8KOd7zy/Yz5OA1+DkwBiiDF4kWp9gA2piwD\n5f6NSz9WUyem/Z0HwA5lr3D5IqnMYlmPKSAan2zzz47LL/PwRqwgYBhEsVRNCU6/\ndB26KuSlV4onC/Mm2ycNLjAx1wrBig5s7Bi+dQU1AoGAMmrsPs3LIo6j4QXFKl5l\nD00y8XPdELKegPxYXpvzZcYwuxGF5jSAFHdZfPV5Mbts0x92qD+4CRSJEbb/do8q\nJ+/mAaAlhT+mj9NndMfFh859qlwIyEbPyRTKJOIEgq4gMODaW6R3AvtCXj7htHlP\n1UsKeTA2zWgxkZDg9CijqFQ=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-7g5au@budget-application-ea8df.iam.gserviceaccount.com",
  client_id: "103198234385317718653",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7g5au%40budget-application-ea8df.iam.gserviceaccount.com",
};

const firebaseApp = initializeApp(appCredentials);

export const db = getFirestore();
