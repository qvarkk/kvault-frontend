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
  },
  home: {
    greeting: "Welcome back",
    subtitle: "Here is where you left off",
    viewAll: "View all notes",
  },
  notes: {
    search: "Search notes...",
    empty: "No notes yet",
    createFirst: "Create your first note",
    created: "Note created",
    createTitle: "New note",
    titlePlaceholder: "Note title...",
    sort: {
      updatedAt: "Last updated",
      createdAt: "Date created",
      title: "Title",
    },
    tags: {
      filter: "Tags",
      search: "Search tags...",
      none: "No tags found",
      clear: "Clear all",
    },
  },
  common: {
    retry: "Retry",
    cancel: "Cancel",
    create: "Create",
    creating: "Creating...",
  },
}
