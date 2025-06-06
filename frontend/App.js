import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ContactPage from './Contact';
import AboutPage from './About';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import ForgotPassword from './ForgotPassword';
import PasswordResetOTP from './PasswordResetOTP';
import VerifyEmail from './VerifyEmail';
import SummaryPage from './SummaryPage';
import Dashboard from './Dashboard';
import QuestionPage1 from './QuestionPage1';
import QuestionPage2 from './QuestionPage2';
import QuestionPage3 from './QuestionPage3';
import ResetPasswordPage from './ResetPasswordPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<PasswordResetOTP />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/question1"
          element={
            <ProtectedRoute>
              <QuestionPage1 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/question2"
          element={
            <ProtectedRoute>
              <QuestionPage2 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/question3"
          element={
            <ProtectedRoute>
              <QuestionPage3 />
            </ProtectedRoute>
          }
        />
        <Route
         path="/summary"
         element={
          <ProtectedRoute>
            <SummaryPage/>
        </ProtectedRoute>
      }
      />

        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
