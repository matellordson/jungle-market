// src/types/tiptap-commands.d.ts (Example path)

import "@tiptap/core";

// This augmentation must be done in the global scope for the module
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    // Group the related commands under a logical key (e.g., 'nodeBackground')
    nodeBackground: {
      /**
       * Toggles the background color for the current block node.
       */
      toggleNodeBackgroundColor: (color: string) => ReturnType;
      /**
       * Removes the background color from the current block node.
       */
      unsetNodeBackgroundColor: () => ReturnType;
    };
  }
}
