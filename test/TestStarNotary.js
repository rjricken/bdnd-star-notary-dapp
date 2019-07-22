const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();

    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");

    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});

    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");

    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});

    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);

    await instance.buyStar(starId, {from: user2, value: balance});

    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);

    assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");

    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});

    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);

    await instance.buyStar(starId, {from: user2, value: balance});

    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");

    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});

    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);

    await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});

    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);

    assert.equal(value, starPrice);
});

it('can add the star name and star symbol properly', async() => {
    let instance = await StarNotary.deployed();
    await instance.createStar('red dwarf', 100, { from: accounts[0] });

    assert.equal('Star Token', await instance.name.call());
    assert.equal('STR', await instance.symbol.call());
});

it('lets 2 users exchange stars', async() => {
    let instance = await StarNotary.deployed()

    const redDwarfId = 200301
    const neutronStarId = 300083

    await instance.createStar('red dwarf', redDwarfId, { from: accounts[0] })
    await instance.createStar('neutron star', neutronStarId, { from: accounts[1] })

    assert.equal(accounts[0], await instance.ownerOf.call(redDwarfId))
    assert.equal(accounts[1], await instance.ownerOf.call(neutronStarId))

    await instance.exchangeStars(redDwarfId, neutronStarId, { from: accounts[1] })

    assert.equal(accounts[1], await instance.ownerOf.call(redDwarfId))
    assert.equal(accounts[0], await instance.ownerOf.call(neutronStarId))
});

it('lets a user transfer a star', async() => {
    let instance = await StarNotary.deployed()
    const tokenId = 133

    await instance.createStar('sol', tokenId, { from: accounts[0] })
    assert.equal(accounts[0], await instance.ownerOf.call(tokenId))

    await instance.transferStar(accounts[1], tokenId, { from: accounts[0] })
    assert.equal(accounts[1], await instance.ownerOf.call(tokenId))
});

it('lookUptokenIdToStarInfo test', async() => {
    let instance = await StarNotary.deployed()
    const tokenId = 200

    await instance.createStar('neutron star', tokenId, { from: accounts[0] })
    assert.equal('neutron star', await instance.lookUpTokenIdToStarInfo(tokenId))
});