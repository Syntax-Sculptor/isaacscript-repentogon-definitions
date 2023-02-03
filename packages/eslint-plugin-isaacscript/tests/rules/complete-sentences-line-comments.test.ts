import { TSESLint } from "@typescript-eslint/utils";
import { CompleteSentenceMessageIds } from "../../src/completeSentence";
import {
  completeSentencesLineComments,
  Options,
} from "../../src/rules/complete-sentences-line-comments";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<
  TSESLint.InvalidTestCase<CompleteSentenceMessageIds, Options>
> = [];

invalid.push({
  name: "Single-line comment without complete sentence",
  code: `
// this is not a complete sentence.
  `,
  errors: [{ messageId: "missingCapital" }],
});

valid.push({
  name: "Comment with complete sentence",
  code: `
// This is a complete
// sentence.
  `,
});

invalid.push({
  name: "Comment without a capital",
  code: `
// sometimes I forget to capitalize
// my sentences.
  `,
  errors: [{ messageId: "missingCapital" }],
});

invalid.push({
  name: "Comment without a period",
  code: `
// Sometimes I forget to put a period on
// my comments
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Blank comments",
  code: `
//

//
//

//
//
//
  `,
});

valid.push({
  name: "Comment with a URL and without trailing text",
  code: `
// Taken from ESLint:
// https://github.com/eslint/eslint/blob/main/lib/rules/max-len.js
  `,
});

valid.push({
  name: "Comment with a URL and with trailing text",
  code: `
// The TypeScript config extends it:
// https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
// (This includes the "parser" declaration of "@typescript-eslint/parser".)
  `,
});

valid.push({
  name: "Comment with a colon and bullet points of non-complete items",
  code: `
// This is my list of things:
//
// - first thing
//   - sub-first thing
// - second thing
  `,
});

valid.push({
  name: "Comment with complete sentence in quotes",
  code: `
// "foo" refers to
// the "baz".
  `,
});

invalid.push({
  name: "Comment with incomplete sentence in quotes",
  code: `
// "foo" refers to
// the "baz"
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Multi-line comment with a complete sentence in quotes",
  code: `
// "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
// was born and I will."
  `,
});

invalid.push({
  name: "Multi-line comment with a incomplete sentence in quotes",
  code: `
// "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
// was born and I will"
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Comment with colon ending with code",
  code: `
// This is a line.
// For example: \`foo()\`
  `,
});

invalid.push({
  name: "Comment without colon ending with code",
  code: `
// This is a line.
// For example \`foo()\`
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Comment with colon ending without a period",
  code: `
// THIS CODE WAS AUTOMATICALLY GENERATED.
// DO NOT EDIT THIS FILE BY HAND.
// YOU CAN REGENERATE IT USING:
// pnpm run generate:rules
  `,
});

valid.push({
  name: "Comment using e.g. and no period",
  code: `
// The static methods in this class can only be called by a global variable.
// e.g. \`Foo.Bar()\`
  `,
});

valid.push({
  name: "Comment using a question",
  code: `
// This is a line.
// What is the meaning of life?
  `,
});

valid.push({
  name: "Comment using a numeric literal",
  code: `
// This is a foo.
//
// 1 << 1
  `,
});

valid.push({
  name: "Comment using a trailing number expression",
  code: `
// For EntityType.TEAR (2)
//
// This is an object instead of a TypeScript enum because we need to specify that it contains bit
// flags. Furthermore, enums cannot be instantiated with \`BitSet128\` objects.
//
// This enum was renamed from "TearFlags" to be consistent with the other flag enums.
  `,
});

valid.push({
  name: "Comment using an in-line URL",
  code: `
{
  {
    {
      {
        // We have to use \`leftTSNode.name\` instead of \`leftTSNode\` to avoid run-time errors
        // because the \`typeChecker.getTypeAtLocation\` method expects a \`ts.BindingName\` instead
        // of a \`ts.VariableDeclaration\`: https://github.com/microsoft/TypeScript/issues/48878
      }
    }
  }
}
  `,
});

valid.push({
  name: "Comment using separators",
  code: `
// ------------
// SHARED TESTS
// ------------
  `,
});

valid.push({
  name: "Comment with eslint-disable",
  code: `
function foo() {
  // eslint-disable-next-line no-useless-return
}
  `,
});

valid.push({
  name: "Comment with ts-ignore",
  code: `
function foo() {
  // @ts-ignore
}
  `,
});

valid.push({
  name: "Comment with eslint-disable and ts-ignore",
  code: `
function foo() {
  // eslint-disable-next-line no-useless-return
  // @ts-ignore
}
  `,
});

valid.push({
  name: "Comment with spillover number in parenthesis",
  code: `
// For EntityType.CONSTANT_STONE_SHOOTER (202), ConstantStoneShooterVariant.CONSTANT_STONE_SHOOTER
// (0)
  `,
});

valid.push({
  name: "Enum block comment type 1",
  code: `
// CollectibleType.SAD_ONION
  `,
});

valid.push({
  name: "Enum block comment type 2",
  code: `
// CollectibleType.SAD_ONION (1)
  `,
});

valid.push({
  name: "Enum block comment type 3",
  code: `
// CacheFlag.FIRE_DELAY (1 << 1)
  `,
});

invalid.push({
  name: "Text that looks like an enum block comment",
  code: `
// This variable uses CollectibleType.SAD_ONION
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Commenting out code using const",
  code: `
// const foo = 123;
  `,
});

valid.push({
  name: "Commenting out code using export",
  code: `
// export const CLIENT_LOBBY_CHANNEL_ID = "123";
  `,
});

ruleTester.run(
  "complete-sentences-line-comments",
  completeSentencesLineComments,
  {
    valid,
    invalid,
  },
);
