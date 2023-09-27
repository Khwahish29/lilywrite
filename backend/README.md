# How to install, deploy and test the contracts

Make a .env file and add the RPC URL and Private Key for LilyPad Lalechuza Testnet as TESTNET_RPC_URL and PRIVATE_KEY

1. Install dependencies

```bash
forge install
```

2. Run tests

```bash
forge test
```

or

```bash
make test
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
