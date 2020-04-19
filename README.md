# ENG to SCRT Unidirectional Swap Tooling

This repo contains the implementation for the [Multisig Setup Proposal](https://hackmd.io/AY1XxpRsQey1E-qB3iSyVg)

## Installation

1. Install the dependencies
   ```js
   yarn
   ```

2. Copy and edit the env file

    ```
    cp .env.defaults .env
    ```
    

3. n/a
   
4. Compile and migrate the smart contracts:
    ```
    yarn migrate
    ```

5. Run the unit tests (the `yarn test` also migrates). The unit test is more of an integration tests that burns tokens and verifies the leader and operators busines logic.
    ```
    yarn test
    ```

6. Start the leader
    ```
    # Set other environment variables in a .env file in the project root
    CHAIN_CLIENT=kamutcli BECH32_PREFIX=kamut ROLE=leader node ./server
    ```
   
7. Start multiple operators
    ```
    # Set other environment variables in a .env file in the project root
    CHAIN_CLIENT=kamutcli BECH32_PREFIX=kamut ROLE=leader node ./server
    ```
   
8. The `client` folder contains a frontend template that gets Web3 and imports the
    `EngSwap` contract. The contract has single `burnFunds(bytes memory _recipient, uint256 _amount)`
    public function. Usage specs and examples can be found in `swap.test.js`.
    When all the components are online, swaps can be tested by calling
    `burnFunds` using Remix or Web3, or by creating a page in the frontend.

## FAQ

* __How do I use this with the Ganache-CLI?__

    It's as easy as modifying the config file! [Check out our documentation on adding network configurations](http://truffleframework.com/docs/advanced/configuration#networks). Depending on the port you're using, you'll also need to update line 29 of `client/src/utils/getWeb3.js`.

