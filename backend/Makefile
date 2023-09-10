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

deploy-sepolia :; forge script script/DeployLilyWrite.s.sol --rpc-url $(RPC_URL) --broadcast --private-key $(PRIVATE_KEY)

test-sepolia :; forge test --fork-url $(RPC_URL)