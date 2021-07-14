var contractAddress = '0x565ADeC2d41b0a68BE416dE594891B041444D3Ba';
var refererDefault = '0x0000000000000000000000000000000000000000';
var userupline = '0x4652b8a3e08cdE5fce721b71c88908295b83Cb12';
var bscScan = "https://scan.thundercore.com/address/"+contractAddress;
var language = 'en';
var auctionEndTime = 1924905600;
var blocktime = 1944905600;
var lastinvest;
var calcd = 10000;
var refrate = 0;
var userLottoRate = 0;
var limitTimerInterval;
var limitTimer = '18120';
var userAddress;
const urlQueryString = window.location.search;
const urlParams = new URLSearchParams(urlQueryString);
var refWallet = (urlParams.get('ref'));
if (refWallet != '') {
    userReferer = refWallet;
}
var defaultTopAddress = '0x0000000000000000000000000000000000000000';
var basicLottoRate = 1;
var contractBalanceRate = 0;
var userLottoRate = 0;
var userAvailable = 0;
var userTotalDeposits = 0;
var userTotalWithdrawn = 0;
var userAmountOfDeposits = 0;
var userLastDepositTime = 0;
var userLottobonus = 0;
var userRefsLevel1 = 0;
var userRefsLevel2 = 0;
var userRefsLevel3 = 0;
var dataTrunc = 0;
//var GAS_LIMIT = 100e4;
var GAS_PRICE = 2e9;
var deps;


function setUserAddress(address) {
	var p2 = address.slice(42 - 5)
	$('.trxWallet').val(address);
	$("#walletConnet").text(address.slice(0, 4) + "..." + p2)
	//$('.reflink').html(location.origin +'/?ref=' + address);
	//$('#reflink').val(location.origin +'/?ref=' + address)
	$('#reflink').html(location.origin +"/?ref="+ address);
}
var web3 = window.addEventListener('load', async function ()
{
	if (window.ethereum)
	{
		window.web3 = new Web3(ethereum)
		try
		{
			await ethereum.enable()
			let accounts = await web3.eth.getAccounts()
			currentAddr = accounts[0];
			//userAddress = accounts[0];
			var obj = setInterval(async () => {
				if (window.web3 && currentAddr) {
					clearInterval(obj);
					userAddress = currentAddr;
					setUserAddress(userAddress);
					//update();
					setTimeout(function () {
						var accountInterval = setInterval(async () => {
							if (currentAddr !== userAddress) {
								userAddress = currentAddr;
								setUserAddress(userAddress);
								update()
							}
						}, 100)
					}, 1200)
				}
			}, 10);
			//runAPP()
			return
		}
		catch (error)
		{
			console.error(error)
		}
	}
	else if (window.web3)
	{
		window.web3 = new Web3(web3.currentProvider)
		let accounts = await web3.eth.getAccounts()
		currentAddr = accounts[0];
		//userAddress = accounts[0];
		var obj = setInterval(async () => {
			if (window.web3 && currentAddr) {
				clearInterval(obj);
				userAddress = currentAddr;
				setUserAddress(userAddress);
				//update();
				setTimeout(function () {
					var accountInterval = setInterval(async () => {
						if (currentAddr !== userAddress) {
							userAddress = currentAddr;
							setUserAddress(userAddress);
							update()
						}
					}, 100)
				}, 1200)
			}
		}, 10);
		//runAPP()
		return
	}
    else {
        console['log']('Non-Ethereum browser detected. You should consider trying MetaMask!');
        window['web3'] = new Web3(new Web3['providers'].HttpProvider('https://mainnet-rpc.thundercore.com'));

    }
	setTimeout(1200)
})

function abbreviate_number(_num, fixed) {
    let num = parseFloat(_num)
    if (num === null) {
        return null;
    } // terminate early
    if (num === 0) {
        return '0';
    } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k <= 10 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c); // enforce -0 is 0
        e = d// + ['', 'K', 'M', 'B', 'T'][k]; // append power

    return e;
}

function toHexString(number){
	return '0x'+number.toString(16)
}

function getFormattedDate(date) {
    let hour = ('0' + date.getUTCHours()).slice(-2);
    let minute = ('0' + date.getUTCMinutes()).slice(-2);
    let day = ('0' + date.getUTCDate()).slice(-2);
    let month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    let year = date.getUTCFullYear();
    return hour + ':' + minute + ' ' + day + '.' + month + '.' + year
}

function getFormattedNumber(num) {
    var num = num + '';
    var value = Number(num);
    var res = num.split('.');
    if (res[0].length <= 2) {
        return value.toFixed(6)
    } else if (res[0].length == 3) {
        return value.toFixed(5)
    } else if (res[0].length == 4) {
        return value.toFixed(4)
    } else if (res[0].length == 5) {
        return value.toFixed(3)
    } else if (res[0].length == 6) {
        return value.toFixed(2)
    } else if (res[0].length == 7) {
        return value.toFixed(1)
    } else if (res[0].length >= 8) {
        return value.toFixed(0)
    }
}
var abi = [{"constant":true,"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserDownlineCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"plan","type":"uint8"}],"name":"getReinvest","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getTimer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserAvailable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TIME_STEP","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReferrer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReferralTotalBonus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PROJECT_FEE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserLottoRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERCENT_STEP","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"referrer","type":"address"},{"name":"plan","type":"uint8"}],"name":"invest","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"plan","type":"uint8"},{"name":"deposit","type":"uint256"}],"name":"getResult","outputs":[{"name":"percent","type":"uint256"},{"name":"profit","type":"uint256"},{"name":"finish","type":"uint256"},{"name":"reinvest","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"nt","type":"uint256"}],"name":"lottoDeposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"REFERRAL_PERCENTS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getlottoStats","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalRefBonus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReferralWithdrawn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserTotalDeposits","outputs":[{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserlottoStats","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"plan","type":"uint8"}],"name":"getPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserAmountOfDeposits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"plan","type":"uint8"}],"name":"getPlanInfo","outputs":[{"name":"time","type":"uint256"},{"name":"percent","type":"uint256"},{"name":"reinvest","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MARKETING_FEE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getUserDepositInfo","outputs":[{"name":"plan","type":"uint8"},{"name":"percent","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"profit","type":"uint256"},{"name":"start","type":"uint256"},{"name":"finish","type":"uint256"},{"name":"reinvest","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startUNIX","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserCheckpoint","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReinvestedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INVEST_MIN_AMOUNT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReferralBonus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getlottoLastPrizes","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"wallet","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"}],"name":"Newbie","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"plan","type":"uint8"},{"indexed":false,"name":"percent","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"profit","type":"uint256"},{"indexed":false,"name":"start","type":"uint256"},{"indexed":false,"name":"finish","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"referrer","type":"address"},{"indexed":true,"name":"referral","type":"address"},{"indexed":true,"name":"level","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"pt","type":"uint256"}],"name":"NewParticipantLotto","type":"event"}]

$(function () {
	async function getSiteStats() {
        let instance = await new web3.eth.Contract(abi, contractAddress);
        let res = await instance.methods.getContractBalance().call();
		let pes = await instance.methods.totalStaked().call();

		totalStaked = Number(web3.utils.fromWei(pes));
		contractBalance = Number(web3.utils.fromWei(res));

		var totalStaked = totalStaked;
        totalStaked = parseFloat(getFormattedNumber(totalStaked.toFixed(5)));
        $('#totalStaked').html(totalStaked + " TT");

        var contractBalance = contractBalance;
        contractBalance = parseFloat(getFormattedNumber(contractBalance.toFixed(5)));
        $('#balanceContract').html(contractBalance + " TT");

		$('#contractAddress').html(contractAddress + '\n Contract Address');
		$("#contractAddress").effect("fade", 2500, function() {
			$("#contractAddress").fadeIn();
			$("#contractAddress").on('click',function() {
			window.open(bscScan);
			})
		});
    }

	/*async function planPercents() {
		await getSiteStats();
		var calcd = 10000;
		var plans = []
		for(let i = 0; i < 6; i++){
			plans[i] = {
				percent: 0,
				profi: 0,
				current: 0,
				finish: 0,
				days: 0,
				clock: 0,
				total: 0
			}
			let instance = await new web3.eth.Contract(abi, contractAddress);
			let clock = await instance.methods.TIME_STEP().call();
			let res = await instance.methods.getResult(i, calcd).call();
			let percent = (res[0])
			let profit = (res[1]);
			let current = (res[2]);
			let finish = (res[3]);
			let days = ((finish - current));

			plans[i].percent = (parseFloat((percent/1000) + userLottoRate).toFixed(3)) ;
			plans[i].totalPercent = (parseFloat(profit)/100).toFixed(2);
			plans[i].day = (parseFloat(days)/clock);
            
			$('#plan'+(i+1)+'Percent').html((plans[i].percent)+ "%");
			$('#plan'+(i+1)+'TPercent').html(plans[i].totalPercent);
			$('#plan'+(i+1)+'Day').html(plans[i].day);

			plans[i].depositAmount = $('#plan'+(i+1)+'amount').on('input', function(){
				amount = this.value * plans[i].totalPercent / 100
				$('#plan'+(i+1)+'Total')[0].innerHTML = (parseFloat(amount)).toFixed(3);
			});

			
		}
	}*/

    async function getlottoStats() {
        //await planPercents();
		await getSiteStats();
        let instance = await new web3.eth.Contract(abi, contractAddress);
        let res = await instance.methods.getlottoStats().call();
		let pes = await instance.methods.getlottoLastPrizes().call();
        userLTop1 = (res[0]);
        userLTop2 = (res[1]);
        userLTop3 = (res[2]);
        userLTop4 = (res[3]);
		userLTop5 = (res[4]);
		lottoCycle = (res[5]);
		lottoCTicket = (res[6]);
		lottoLTickets = (res[8]);
		lottoTicketPrice = Number(web3.utils.fromWei(res[9]));
		currentPot = Number(web3.utils.fromWei(res[10]));
		lottoBag = Number(web3.utils.fromWei(res[11]));

		userLP1 = Number(web3.utils.fromWei(pes[0]));
        userLP2 = Number(web3.utils.fromWei(pes[1]));
        userLP3 = Number(web3.utils.fromWei(pes[2]));
        userLP4 = Number(web3.utils.fromWei(pes[3]));
		userLP5 = Number(web3.utils.fromWei(pes[4]));

        userLP1Trx = userLP1;
        userLP1Trx = parseFloat(getFormattedNumber(userLP1Trx));
        userLP2Trx = userLP2;
        userLP2Trx = parseFloat(getFormattedNumber(userLP2Trx));
        userLP3Trx = userLP3;
        userLP3Trx = parseFloat(getFormattedNumber(userLP3Trx));
        userLP4Trx = userLP4;
        userLP4Trx = parseFloat(getFormattedNumber(userLP4Trx));
		userLP5Trx = userLP5;
        userLP5Trx = parseFloat(getFormattedNumber(userLP5Trx));

        lottoCurrenticket = lottoLTickets - lottoCTicket;
        var numbertickets = parseFloat($('.input-number').val());
        lottoTicketPriceTrx = lottoTicketPrice * numbertickets;
        lottoTicketPriceTrx = parseFloat(getFormattedNumber(lottoTicketPriceTrx));

		currentPotTrx = currentPot + (lottoBag/20);
        currentPotTrx = parseFloat(getFormattedNumber(currentPotTrx));

		lottoBagTrx = lottoBag;
        lottoBagTrx = parseFloat(getFormattedNumber(lottoBagTrx));

		$('#lottoCurrenticket').text(lottoCurrenticket);

        $('#lottoTicketPrice').text(lottoTicketPriceTrx + " TT");
		$('#currentpot').text(currentPotTrx + " TT");
		$('#lottoBag').text(lottoBagTrx + " TT");
		$('#lottoCycle').text(lottoCycle);

		if (userLTop1 == defaultTopAddress) {
            $('#userLTop1').text("😢 No Participant");
			$('#Prize1').html("0 TT");
        } else {
            $('#userLTop1').text("🥇 " + userLTop1.substr(0, 8) + "...");
			$('#Prize1').html(userLP1Trx + " TT");
        }

        if (userLTop2 == defaultTopAddress) {
            $('#userLTop2').text("😢 No Participant");
			$('#Prize2').html("0 TT");
        } else {
            $('#userLTop2').text("🥈 " + userLTop2.substr(0, 8) + "...");
			$('#Prize2').html(userLP2Trx + " TT");
        }
        if (userLTop3 == defaultTopAddress) {
            $('#userLTop3').text("😢 No Participant");
			$('#Prize3').html("0 TT");
        } else {
            $('#userLTop3').text("🥉 " + userLTop3.substr(0, 8) + "...");
			$('#Prize3').html(userLP3Trx + " TT");
        }
        if (userLTop4 == defaultTopAddress) {
            $('#userLTop4').text("😢 No Participant");
			$('#Prize4').html("0 TT");
        } else {
            $('#userLTop4').text("🏅 " + userLTop4.substr(0, 8) + "...");
			$('#Prize4').html(userLP4Trx + " TT");
        }
        if (userLTop5 == defaultTopAddress) {
            $('#userLTop5').text("😢 No Participant");
			$('#Prize5').html("0 TT");
        } else {
            $('#userLTop5').text("🎖 " + userLTop5.substr(0, 8) + "...");
			$('#Prize5').html(userLP5Trx + " TT");
        }
    }
    async function updateSiteStats() {
        await getlottoStats();
    }

	updateSiteStats();
    setInterval(function () {
        updateSiteStats();
    }, 1250);
});

$(function () {
	async function stake(planId){
		let instance = await new web3.eth.Contract(abi, contractAddress);
		if (!web3.utils.isAddress(userReferer)) {
			userReferer = refererDefault;
		}
            upline = userReferer;
			if (userReferer == refererDefault) {
		    upline = userupline;
		  }
		  let inputAmount = toHexString($('#plan'+(planId+1)+'amount')[0].value * 1e18)		
		  let res = await instance.methods.invest(upline, planId).send({
			  from: userAddress,
			  value: inputAmount,
			  gasPrice: GAS_PRICE
		  }).then(res => {
			  alert('TX Hash\n https://scan.thundercore.com/transactions/'+res.blockHash+'\nReferrer\n'+ upline);
		  })
		  window.location.reload(true);
	  }

    $("#investP1").click(function (e) {
        e.preventDefault();
        stake(0);
        return false
    });
	$("#investP2").click(function (e) {
        e.preventDefault();
        stake(1);
        return false
    });
	$("#investP3").click(function (e) {
        e.preventDefault();
        stake(2);
        return false
    });
	$("#investP4").click(function (e) {
        e.preventDefault();
        stake(3);
        return false
    });
	$("#investP5").click(function (e) {
        e.preventDefault();
        stake(4);
        return false
    });
	$("#investP6").click(function (e) {
        e.preventDefault();
        stake(5);
        return false
    });

    async function Buyticket() {
		var numbertickets = parseFloat($('.input-number').val().replace(',', '.'));
		if(lottoCurrenticket < numbertickets){
			numbertickets = lottoCurrenticket;
		}
        var amount = 100 * numbertickets;
		if(amount > 1000){
			amount = 1000;
		}
			amount = toHexString(amount * 1e18)
            try {
                let instance = await new web3.eth.Contract(abi, contractAddress);
                let res = await instance.methods.lottoDeposit(numbertickets).send({
                    from: userAddress,
                    value: amount,
                    gasPrice: GAS_PRICE
                });
                setTimeout(function () {
                    update()
                }, 5000)
            } catch (error) {}
     window.location.reload(true);
    }
    $("#Buyticket").click(function (e) {
        e.preventDefault();
        Buyticket();
        return false
    });

	async function withdraw() {
        try {
            let instance = await new web3.eth.Contract(abi, contractAddress);
            let res = await instance.methods.withdraw().send({
                from : userAddress,
                value: 0,
                gasPrice: GAS_PRICE
            });
            setTimeout(function () {
                update()
            }, 5000)
        } catch (error) {}
		window.location.reload(true);
    }
    $("#withdraw").click(function (e) {
        e.preventDefault();
        withdraw();
        return false
    });

    async function rescue() {
        try {
            let instance = await new web3.eth.Contract(abi, contractAddress);
            let res = await instance.methods.rescue().send({
                from : userAddress,
                value: 0,
                gasPrice: GAS_PRICE
            });
            setTimeout(function () {
                update()
            }, 5000)
        } catch (error) {}
    }
    $("#rescue").click(function (e) {
        e.preventDefault();
        rescue();
        return false
    });

    async function getUserlottoStats() {
        let instance = await new web3.eth.Contract(abi, contractAddress);
        let res = await instance.methods.getUserlottoStats(userAddress).call();
        userLottobonus = Number(web3.utils.fromWei(res[0]));
		userLottoparts = (res[1]);

        userLottobonusTrx = userLottobonus;
        userLottobonusTrx = parseFloat(getFormattedNumber(userLottobonusTrx));

		$('#userLottobonus').text(userLottobonusTrx + " TT");
        $('#userLottoparts').text(userLottoparts);

    }

    async function getUserLottoRate() {
        await getUserlottoStats();
        userLottoRate = userLottoparts * 5;
        userLottoRate = userLottoRate / 1000;
		$('#userLottoRate').text('+' + userLottoRate + '%');
    }

	async function getTotalNumberOfDeposits() {
		await getUserLottoRate();
		let instance = await new web3.eth.Contract(abi, contractAddress);
		totalUserDeposits = await instance.methods.getUserAmountOfDeposits(userAddress).call();
		$("#TotalNumberOfDeposits").text("Total: "+totalUserDeposits);
		var deps = $('.active-stakes').html();
		await getUserDepositInfo(totalUserDeposits);
	}

	async function getUserDepositInfo(depss) {
		//let instance = await new web3.eth.Contract(abi, contractAddress);
		//var deps = await instance.methods.getUserAmountOfDeposits(userAddress).call();
		//await getTotalNumberOfDeposits()
        /*$('.active-stakes').html(`<tr class="container-fluid">
		<td colspan="3"id="getUserDepositInfo1" style="color:#ffe81c;margin-left: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Plan</td>
		<td colspan="3"id="getUserDepositInfo2" style="color:#ffe81c;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Percent</td>
		<td colspan="3"id="getUserDepositInfo3" style="color:#ffe81c;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Amount</td>
		<td colspan="3"id="getUserDepositInfo4" style="color:#ffe81c;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Profit</td>
		<td colspan="3"id="getUserDepositInfo5" style="color:#ffe81c;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Start</td>
		<td colspan="3"id="getUserDepositInfo6" style="color:#ffe81c;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Finish</td>
		<td colspan="3"id="getUserDepositInfo6" style="color:white;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Status</td>
		</tr>`)*/
		for(let i = 0; i < depss; i++){
			let instance = await new web3.eth.Contract(abi, contractAddress);
			let data = await instance.methods.getUserDepositInfo(userAddress, i).call();
			var now = new Date().getTime();
			var isFinished = false;
			var start = (new Date(data[4] * 1000).getMonth()+1) +'/'+ new Date(data[4] * 1000).getDate() 
			var end = (new Date(data[5] * 1000).getMonth()+1) +'/'+ new Date(data[5] * 1000).getDate() +" @ "+ new Date(data[5] * 1000).getHours() +":"+ new Date(data[5] * 1000 / 60 * 60).getMinutes()
			var stakeEnd = data[5] *1000;		
			var distance = parseInt(stakeEnd) - parseInt(now);
			var newRow;
			
			if (distance <= 0 ) {
				isFinished = "Completed";
		   } else {
				isFinished ="Still Collecting";
		   }		
			if (depss >= 0) {
				newRow += `<tr class="container-fluid">
				<td colspan="3"id="getUserDepositInfo1" style="color:#ffe81c;margin-left: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Plan</td>
				<td colspan="3"id="getUserDepositInfo2" style="color:#ffe81c;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Percent</td>
				<td colspan="3"id="getUserDepositInfo3" style="color:#ffe81c;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Amount</td>
				<td colspan="3"id="getUserDepositInfo4" style="color:#ffe81c;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Profit</td>
				<td colspan="3"id="getUserDepositInfo5" style="color:#ffe81c;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Start</td>
				<td colspan="3"id="getUserDepositInfo6" style="color:#ffe81c;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Finish</td>
				<td colspan="3"id="getUserDepositInfo6" style="color:white;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Status</td>
				</tr>`;
				newRow += '<tr class="container-fluid">';
                newRow += '<td colspan="3"id="getUserDepositInfo1" style="margin-right: 400px;padding-right: 0px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">' + (parseInt(data[0])+1) + '</td>';
                newRow += '<td colspan="3"id="getUserDepositInfo2" style="margin-right: 400px;padding-right: 0px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">' + (data[1]/1000+"%") + '</td>';
                newRow += '<td colspan="3"id="getUserDepositInfo3" style="margin-right: 400px;padding-right: 0px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">' + (web3.utils.fromWei(data[2], "ether")) + '</td>';
				newRow += '<td colspan="3"id="getUserDepositInfo4" style="margin-right: 400px;padding-right: 0px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">' + (web3.utils.fromWei(data[3], "ether")) + '</td>';
				newRow += '<td colspan="3"id="getUserDepositInfo5" style="margin-right: 400px;padding-right: 0px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">' + (start) + '</td>';
				newRow += '<td colspan="3"id="getUserDepositInfo6" style="margin-right: 400px;padding-right: 0px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">' + (end) + '</td>';
				newRow += '<td colspan="3"id="isFinished" style="color:#ffe81c;margin-right: 400px;padding-right: 0px;"class="mbr-content-title mbr-light mbr-fonts-style display-7">' + (isFinished) + '</td>';
                newRow += '</tr>';

			$('.active-stakes').html(newRow);
			
			}
		}	
	}

	async function getUserReferrer() {
        //await getUserDepositInfo();
		await getTotalNumberOfDeposits();
		 let instance = await new web3.eth.Contract(abi, contractAddress);
		  let data = await instance.methods.getUserReferrer(userAddress).call();
		  $("#getUserReferrerAddress").text("refferer:" +data);
	  }
	  async function getUserCheckpoint() {
		await getUserReferrer();
		  let instance = await new web3.eth.Contract(abi, contractAddress);
		  let data=await instance.methods.getUserCheckpoint(userAddress).call();
		  $("#getUserCheckpointdata").text("getUserCheckpoint:" +data);
		  checkpoint = data;
	  }
	  async function getUserReferralTotalBonus() {
		  await getUserCheckpoint();
		let instance = await new web3.eth.Contract(abi, contractAddress);
		  let dataFull = (await instance.methods.getUserReferralTotalBonus(userAddress).call() / 1e18);
		  let data = abbreviate_number(dataFull, 4)
		  $("#getUserReferralTotalBonus").text(data+" "+"TT");
	  }
	  async function getUserAvailable() {
		  await getUserReferralTotalBonus();
		  let instance = await new web3.eth.Contract(abi, contractAddress);
		  let data=await instance.methods.getUserAvailable(userAddress).call();
		  dataTrunc = data / 1e18;
		  $("#getUserAvailable").text(abbreviate_number(dataTrunc, 4)+" "+"TT");
	  }
	  async function getUserReferralBonus() {
		  await getUserAvailable();
		  let instance = await new web3.eth.Contract(abi, contractAddress);
		  let data=await instance.methods.getUserReferralBonus(userAddress).call();
		  dataTrunc = data / 1e18;
		  $("#getUserReferralBonus").text(abbreviate_number(dataTrunc, 4)+" "+"TT");
	  }
	  async function getUserReferralWithdrawn() {
		  await getUserReferralBonus();
		let instance = await new web3.eth.Contract(abi, contractAddress);
		  let data=await instance.methods.getUserReferralWithdrawn(userAddress).call();
		  dataTrunc = data / 1e18;
		  $("#getUserReferralWithdrawn").text(abbreviate_number(dataTrunc, 4)+" "+"TT");
	  }
	  async function getUserTotalDeposits() {
		  await getUserReferralWithdrawn();
		let instance = await new web3.eth.Contract(abi, contractAddress);
		  let depositData = await instance.methods.getUserTotalDeposits(userAddress).call();
		  depositDataTrunc = depositData / 1e18;
		  $("#getUserTotalDeposits").text(abbreviate_number(depositDataTrunc, 4)+" "+"TT");
	  }
	  async function getUserDownlineCount() {		
        await getUserTotalDeposits();
		let instance = await new web3.eth.Contract(abi, contractAddress);
		  let data=await instance.methods.getUserDownlineCount(userAddress).call();
		  downline= $('#getUserDownlineCount').html(parseInt(data[0]) + parseInt(data[1]) + parseInt(data[2]));
		  
		  $("#getUserDownlineCountIndex1").text("uint:" +data[0]);
		  $("#getUserDownlineCountIndex2").text("uint:" +data[1]);
		  $("#getUserDownlineCountIndex3").text("uint:" +data[2]);
	  }
	 /* async function getUserRefRate() {		
        await getUserDownlineCount();
		let instance = await new web3.eth.Contract(abi, contractAddress);
		let res = await instance.methods.getUserRefRate(userAddress).call();
		  refrate = (res);
		  refrate = parseFloat(refrate/1000);
		  $('#getUserRefBonus').html("+ " + refrate + "%");
		  $('#getUserRefBonus1').html("+ " + refrate + "%");

	  }*/

    async function update() {
		//await getUserRefRate();
		await getUserTotalDeposits();

    }
	async function updatedeps(){
		await getUserDepositInfo();
	}
   
   setInterval(function () {
        if (userAddress) {
            update();
        }
    }, 5000);

	setInterval(function () {
        if (userAddress) {
            updatedeps();
        }
    }, 10000);
});

function copyToClipboard(reflink) {
	var aux = document.createElement("input");
	aux.setAttribute("value", document.getElementById(reflink).innerHTML);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	alert("Copied");
}
