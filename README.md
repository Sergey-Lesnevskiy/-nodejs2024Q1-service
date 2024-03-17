# Home Library Service
## REST service: Docker

## Instruction

```
git clone {https://github.com/Sergey-Lesnevskiy/nodejs2024Q1-service}
```
cd nodejs2024Q1-service

git checkout docker


## Running application

```
npm run docker
```

## Scanning
Scan application
```
npm run scan:application
```
Scan database
```
npm run scan:postgres

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
