import React, {type JSX} from 'react';
import { SignIn } from '@clerk/clerk-react';
import './SignInPage.module.css';

/**
 * Sign In Page Component
 * 
 * @component
 * @returns {JSX.Element} - The Sign In page UI component.
 */
const SignInPage: React.FC = (): JSX.Element => {
  return (
    <div className="signInContainer">
      <div className="signInContent">
        <h1>Sign In to Decode</h1>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
