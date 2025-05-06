import React, { type JSX } from 'react';
import { SignUp } from '@clerk/clerk-react';
import styles from './SignUpPage.module.css';

/**
 * SignUpPage component renders the sign-up form using Clerk.
 *
 * @component
 * @returns {JSX.Element}
 */
const SignUpPage: React.FC = (): JSX.Element => {
  return (
    <div className={styles.signUpContainer}>
      <h1>Create Your Decode Account</h1>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
