# How to install, deploy and test the contracts

Make a .env file and add the rpc url and private key for Filecoin Calibration Testnet.

1. Install dependencies

```bash
forge install
```

2. Run tests

```bash
forge test --fork-url $CALIBRATION_TESTNET_RPC_URL
```

or

```bash
make test-testnet
```

3. Deploy contracts

```bash
make deploy-testnet
```

4. Other things to do

Format the codes

```bash
make format
```

See test coverage

```bash
forge coverage
```
