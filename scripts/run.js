const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1")
  });

  await waveContract.deployed();
  console.log("Contract addy:", waveContract.address);

  // Get Contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  )
  console.log(`Contract Balance: ${
    hre.ethers.utils.formatEther(contractBalance)
  }`)

  // Send Wave

  let waveTxn = await waveContract.wave("This is a wave #1");
  await waveTxn.wait(); // Wait for the transaction to be mined

  let waveTxn2 = await waveContract.wave("This is a wave #2");
  await waveTxn2.wait(); // Wait for the transaction to be mined

  // Get contract balance to see what happend
  contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  )
  console.log(`Contract Balance: ${
    hre.ethers.utils.formatEther(contractBalance)
  }`)

  let allWaves = await waveContract.getAllWaves()
  console.log(allWaves)
}

const runMain = async () => {
  try {
    await main();
    process.exit(0); // Exit Node process without error
  } catch (err) {
    console.log({ err });
    process.exit(1) // Exit Node process while indicating 'Uncought Fatal Exception'error
  }
}

runMain()