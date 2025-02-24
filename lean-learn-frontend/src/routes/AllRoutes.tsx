import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from '../components/layout/Loading';


// Lazily load all pages
const HomePage = lazy(() => import('../pages/HomePage'));
const QuizPage = lazy(() => import('../pages/roles/user/QuizPage'));
const Login = lazy(() => import('../pages/LoginPage'));
const SignUp = lazy(() => import('../pages/SignupPage'));
const TeacherDashboard = lazy(() => import('../components/layout/roles/teacher/TeacherDashboard'));
const CreateQuiz = lazy(() => import('../components/layout/roles/teacher/CreateQuiz'));
// const QuestionSelection = lazy(() => import('../components/teacher/QuestionSelection'));
// const QuestionBank = lazy(() => import('../components/teacher/QuestionBank'));
// const ClassQuestions = lazy(() => import('../components/teacher/ClassQuestions'));
// const AddQuestion = lazy(() => import('../components/teacher/AddQuestion'));
const SelectingMentors = lazy(() => import('../components/layout/roles/user/SelectingMentors'));
// const QuizPage = lazy(() => import('../components/home/QuizPage'));
// const SelectedTopicPage = lazy(() => import('../components/home/selectTopic'));
// const Summary = lazy(() => import('../components/home/Summary'));
// const Feedback = lazy(() => import('../components/home/Feedback'));
const NotFound = lazy(() => import('../components/layout/PageNotFound'));
const ComponentPage =lazy(()=>import('../components/ui/ComponentPage'));
const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Auth routes */}
          <Route path="/auth" element={
            <Suspense fallback={<Loading />}>
                <Login />
             
            </Suspense>
          } />
          
          <Route path="/signup" element={
            <Suspense fallback={<Loading />}>
                <SignUp />
                
            </Suspense>
          } />
         
          
          {/* Teacher routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          {/* <Route path="/create-quiz/questions" element={
            <Suspense fallback={<Loading />}>
                <QuestionSelection />
            </Suspense>
          } />
          
          <Route path="/teacher/question-bank" element={
            <Suspense fallback={<Loading />}>
              <QuizLayout>
                <QuestionBank />
              </QuizLayout>
            </Suspense>
          } />
          
          <Route path="/teacher/question-bank/class/:classId" element={
            <Suspense fallback={<Loading />}>
              <QuizLayout>
                <ClassQuestions />
              </QuizLayout>
            </Suspense>
          } />
          
          <Route path="/teacher/question-bank/class/:classId/add-question" element={
            <Suspense fallback={<Loading />}>
              <QuizLayout>
                <AddQuestion />
              </QuizLayout>
            </Suspense>
          } /> */}
          
          {/* Student/Quiz routes */}
          <Route path="/select-mentor" element={
            <Suspense fallback={<Loading />}>
           <QuizPage/>
            </Suspense>
          } />
          <Route path="/component" element={
            <Suspense fallback={<Loading />}>
           <ComponentPage/>
            </Suspense>
          } />
          {/* <Route path="/quiz-page" element={
            <Suspense fallback={<Loading />}>
              <QuizLayout>
                <QuizPage />
              </QuizLayout>
            </Suspense>
          } />
          
          <Route path="/topic/:topicId" element={
            <Suspense fallback={<Loading />}>
              <QuizLayout>
                <SelectedTopicPage />
              </QuizLayout>
            </Suspense>
          } />
          
          <Route path="/summary" element={
            <Suspense fallback={<Loading />}>
              <QuizLayout>
                <Summary />
              </QuizLayout>
            </Suspense>
          } />
          
          <Route path="/feedback" element={
            <Suspense fallback={<Loading />}>
              <QuizLayout>
                <Feedback />
              </QuizLayout>
            </Suspense>
          } /> */}
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AllRoutes;