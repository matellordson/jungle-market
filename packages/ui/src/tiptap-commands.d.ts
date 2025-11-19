import "@tiptap/core";

// Declare the module augmentation for the Tiptap core library
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    /**
     * Commands for the custom node background extension (or similar)
     */
    nodeBackground: {
      /**
       * Toggles the background color for the current node.
       */
      toggleNodeBackgroundColor: (color: string) => ReturnType;
      /**
       * Removes the background color for the current node.
       */
      unsetNodeBackgroundColor: () => ReturnType;
    };
  }

  // NOTE: If the extension is named differently, you might need to
  // adjust the namespace or the command structure.
}
