import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import { Result } from "../lib/generics";
import List from "../module/book/pages/listPage/ListPage";
import PageLayout from "../lib/layout/Layout"

// const PageLayout = lazy(()=>import("../lib/layout/Layout"));
// const List = lazy(()=>import("../module/book/pages/listPage/ListPage"));
const CsvUploads = lazy(()=>import("../module/book/pages/CSVUploads/CsvUploads"));
const AddBook = lazy(()=>import("../module/book/pages/addBook/AddBook"));
const BookDetails = lazy(()=>import("../module/book/pages/bookDetails/BookDetails"));
const EditBook = lazy(()=>import("../module/book/pages/editBook/EditBook"));
const AuthPage = lazy(()=>import("../module/user/pages/auth/Auth"));
const UploadFile = lazy(()=>import("../module/book/pages/uploadFile/UploadFile"));
const UsersList = lazy(()=>import("../module/user/pages/usersList/UsersList"));
const CsvUploadErrors = lazy(()=>import("../module/book/pages/CSVUploadErrors/CsvUploadErrors"));
const UserDetails = lazy(()=>import("../module/user/pages/userDetails/UserDetails"));
const Profile = lazy(()=>import("../module/user/pages/profile/Profile"));

const Router = () => {
    const isUserAuthenticated = !!localStorage.getItem("AUTH-TOKEN");
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={isUserAuthenticated ? <Profile/> : <AuthPage />} />
                <Route element={<ProtectedRoutes />}>
                    <Route exact path="/" element={<PageLayout content={<List />} />} />
                    <Route exact path="book/:bookId" element={<PageLayout content={<BookDetails />} />} />
                    <Route exact path="/add-book" element={<PageLayout content={<AddBook />} />} />
                    <Route exact path="/add-book/:bookId" element={<PageLayout content={<EditBook />} />} />
                    <Route exact path="/upload-file" element={<PageLayout content={<UploadFile />} />} />
                    <Route exact path="/bulk-uploads" element={<PageLayout content={<CsvUploads />} />} />
                    <Route exact path="/users-list" element={<PageLayout content={<UsersList />} />} />
                    <Route exact path="/profile" element={<PageLayout content={<Profile />} />} />
                    <Route exact path="/users-list/:userId" element={<PageLayout content={<UserDetails />} />} />
                    <Route exact path="/bulk-uploads/:session_id" element={<PageLayout content={<CsvUploadErrors />} />} />
                    <Route path="*" element={<Result status='404' title="404" subTitle="Page not found" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Router;







