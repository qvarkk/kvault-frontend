export default {
  auth: {
    login: {
      action: "Log in",
      title: "Log in to your account",
      message: "Good to see you again! Ready to get started?",
    },
    signUp: {
      action: "Sign up",
      title: "Create an account",
      message: "Your notes, your data. Get started in seconds.",
    },
    success: "Successfully logged in",
    email: "Email",
    password: "Password",
  },
  validation: {
    email: "Provide proper email",
    password: {
      min: "Password has to be minimum {min} characters",
    },
  },
  head: {
    login: "Login",
    signUp: "Sign Up",
    home: "Home",
  },
  nav: {
    home: "Home",
    notes: "Notes",
    files: "Files",
    account: "Account",
    settings: "Settings",
    logout: "Log out",
  },
  errors: {
    network: {
      title: "Network Error",
      detail: "Could not reach the server. Please check your connection.",
    },
    internal: {
      title: "Internal Error",
      detail: "Please try again later.",
    },
    notFound: {
      message: "Not found",
    },
  },
  home: {
    greeting: "Welcome back",
    subtitle: "Here is where you left off",
    viewAll: "View all notes",
  },
  notes: {
    backToNotes: "Back to notes",
    search: "Search notes...",
    empty: "No notes yet",
    create: {
      title: "New note",
      placeholder: "Note title...",
      created: "Note created",
      first: "Create your first note",
    },
    update: {
      saved: "Note saved",
      unsaved: "Unsaved",
      autotag: "Autotag",
      titleChanged: "Title was changed successfully",
    },
    delete: {
      title: "Delete note?",
      description: "This note will be moved to trash.",
      deleted: "Note moved to trash",
    },
    sort: {
      updatedAt: "Last updated",
      createdAt: "Date created",
      title: "Title",
    },
    tags: {
      add: "Add",
      create: 'Create "{name}"',
      filter: "Tags",
      search: "Search tags...",
      none: "No tags found",
      clear: "Clear all",
      generate: "Generate",
    },
    editor: {
      exportPdfTitle: "Export as PDF",
      exportPdfButton: "Export",
      exportPdfSuccess: "PDF exported sucessfully",
      exportPdfErrorTitle: "Unexpected error",
      exportPdfErrorDescription: "Unknown error occured while exporting PDF",
    },
  },
  files: {
    search: "Search files...",
    download: "Download",
    empty: "No files yes",
    dropHere: "Drop PDF files here",
    onlyPdf: "Only PDF files are allowed",
    upload: {
      first: "Upload your first file",
    },
    delete: {
      title: "Delete file?",
      description: "This file will be moved to trash.",
      deleted: "File was moved to trash",
    },
    status: {
      ready: "Ready",
      uploading: "Uploading",
      processing: "Processing",
      error: "Error",
    },
    sort: {
      createdAt: "Date uploaded",
      name: "Name",
      size: "Size",
    },
  },
  settings: {
    title: "Settings",
    tabs: {
      account: "Account",
      stopwords: "Stopwords",
      tags: "Tags",
    },
    account: {
      email: "Email",
      apiKey: {
        name: "API Key",
        title: "Refresh API Key",
        description: "Refreshing your API key will invalidate the current one.",
        refresh: "Refresh",
        refreshed: "API key refreshed",
      },
      password: {
        title: "Change Password",
        description: "Update your account password.",
        action: "Change",
        old: "Current Password",
        new: "New Password",
        changed: "Password changed successfully",
      },
      delete: {
        title: "Delete Account",
        description:
          "This will permanently delete all your data including notes, files and tags.",
        action: "Delete",
        iUnderstand: "I Understand Consequences",
        password: "Password",
        forever: "Delete Forever",
        deleted: "Account deleted",
      },
    },
  },
  common: {
    retry: "Retry",
    cancel: "Cancel",
    create: "Create",
    upload: "Upload",
    save: "Save",
    creating: "Creating...",
    saving: "Saving...",
    delete: "Delete",
  },
}
