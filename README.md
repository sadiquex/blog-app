## Blog Application

### Written Report: Design and Implementation Decisions for Blog App Project

1. **Introduction**
   The blog application is designed to allow users to create, view, comment on, and edit blog posts. It integrates Firebase for authentication, data storage, and real-time updates.

2. **Tech Stack**

- React + Typescript - Frontend Development
- TailwindCSS - Styling
- Firebase and firestore - Backend authentication and database

3. **Database Structure**

- **Data structure**:

  - Blogs Collection: Stores blog posts with fields for title, content, author, image URL, and creation timestamp.
  - Comments Subcollection: Each blog document contains a subcollection for comments, allowing nested and structured data.

- **Firebase Storage**: Used for storing and serving user-uploaded images. It integrates seamlessly with Firestore and provides secure file storage with easy access.

4. **Implementation decisions**

- **Blog Creation and Editing**

  - **Form Handling**: Implemented using React's state management. Form fields include title, content, and image upload.
  - **Image Upload**: Images are uploaded to Firebase Storage, and the URL is saved in the Firestore document.
  - **Validation**: Added checks to ensure that fields are not empty before submission.

- **Commenting Feature**
  - **Real-time Updates**: Utilized Firestore's onSnapshot to listen for real-time updates in comments.
  - **Data Integrity**: Ensured comments are tied to the specific blog post using Firestore's subcollections.

5. **Conclusion**
   This blog application leverages Firebase's tools for authentication, database, and storage.
