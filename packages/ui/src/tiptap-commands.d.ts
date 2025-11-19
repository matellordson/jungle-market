import "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    nodeBackground: {
      /**
       * Toggle node background color
       */
      toggleNodeBackgroundColor: (color: string) => ReturnType;
      /**
       * Unset node background color
       */
      unsetNodeBackgroundColor: () => ReturnType;
    };
  }
}
