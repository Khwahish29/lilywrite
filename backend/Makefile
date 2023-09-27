-include .env

# Clean the repo
clean  :; forge clean


# Update Dependencies
update:; forge update
build:; forge build
compile:; forge compile
test :; forge test 
snapshot :; forge snapshot
format :; forge fmt

deploy-testnet :; forge script script/DeployLilyWrite.s.sol --rpc-url $(TESTNET_RPC_URL) --broadcast --private-key $(PRIVATE_KEY)