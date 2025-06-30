import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const REQUIRED_TEST_DIRS = [
  'src/components',
  'src/contexts',
  'src/templates',
  'src/app',
];

const IGNORED_PATTERNS = [
  '**/index.{ts,tsx}',
  '**/*.d.ts',
  '**/*.stories.{ts,tsx}',
  '**/types.{ts,tsx}',
  '**/*.test.{ts,tsx}',
  '**/node_modules/**',
  '**/.next/**',
];

function findComponentFiles(dir: string): string[] {
  return glob.sync(`${dir}/**/*.{ts,tsx}`, {
    ignore: IGNORED_PATTERNS,
  });
}

function hasTestFile(componentPath: string): boolean {
  const dir = path.dirname(componentPath);
  const base = path.basename(componentPath, path.extname(componentPath));

  const possibleTests = [
    path.join(dir, `${base}.test.tsx`),
    path.join(dir, `${base}.test.ts`),
  ];

  return possibleTests.some((testPath) => fs.existsSync(testPath));
}

function checkTestFiles(): boolean {
  let allTestsExist = true;
  const missingTests: string[] = [];

  REQUIRED_TEST_DIRS.forEach((dir) => {
    const componentFiles = findComponentFiles(dir);

    componentFiles.forEach((componentPath) => {
      if (!hasTestFile(componentPath)) {
        allTestsExist = false;
        missingTests.push(componentPath);
      }
    });
  });

  if (!allTestsExist) {
    console.error('\nThe following files are missing test files:');
    missingTests.forEach((file) => {
      console.error(`- ${file}`);
    });
    console.error('\nPlease create test files for these components.');
    process.exit(1);
  }

  console.log('✅ All required components have test files.');
  return true;
}

checkTestFiles();
