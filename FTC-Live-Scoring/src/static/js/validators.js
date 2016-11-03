$(document).ready(function(){
	$("#retirementAmountIfSavingPerMonth").on("submit", function(e) { 
		var form = $(e.currentTarget);

		var yearsUntilRetirement = form.find("input[name='yearsUntilRetirement']").val();
		var amountSavingPerMonth = form.find("input[name='amountSavingPerMonth']").val();
		var yearlyInterestRateOfInvestment = form.find("input[name='yearlyInterestRateOfInvestment']").val();

		//debugger;

		var error = form.find(".alert");
		error.hide();

		if(yearsUntilRetirement === "" ||  amountSavingPerMonth === "" || yearlyInterestRateOfInvestment === ""){
			error.text("One of your fields is empty!");
			error.show();
			e.preventDefault();
		}else if (yearsUntilRetirement < 0 || yearsUntilRetirement > 80 ||
					amountSavingPerMonth < 0 || amountSavingPerMonth > 10000000 ||
					yearlyInterestRateOfInvestment < 0 || yearlyInterestRateOfInvestment > .3){
			error.text("One of your fields is out of range!");
			error.show();
			e.preventDefault();
		}

	});

	$("#investedAmountAfterSomeYears").on("submit", function(e) { 
		var form = $(e.currentTarget);

		var yearsUntilRetirement = form.find("input[name='yearsInvesting']").val();
		var amountSavingPerMonth = form.find("input[name='initialAmount']").val();
		var yearlyInterestRateOfInvestment = form.find("input[name='yearlyInterestRateOfInvestment']").val();

		//debugger;

		var error = form.find(".alert");
		error.hide();

		if(yearsUntilRetirement === "" ||  amountSavingPerMonth === "" || yearlyInterestRateOfInvestment === ""){
			error.text("One of your fields is empty!");
			error.show();
			e.preventDefault();
		}else if (yearsUntilRetirement < 0 || yearsUntilRetirement > 80 ||
					amountSavingPerMonth < 0 || amountSavingPerMonth > 10000000 ||
					yearlyInterestRateOfInvestment < 0 || yearlyInterestRateOfInvestment > .3){
			error.text("One of your fields is out of range!");
			error.show();
			e.preventDefault();
		}

	});

	$("#monthsToPayOffLoan").on("submit", function(e) { 
		var form = $(e.currentTarget);

		var yearsUntilRetirement = form.find("input[name='monthlyPaymentAmount']").val();
		var amountSavingPerMonth = form.find("input[name='initialLoanAmount']").val();
		var yearlyInterestRateOfInvestment = form.find("input[name='yearlyInterestRateOfLoan']").val();

		//debugger;

		var error = form.find(".alert");
		error.hide();

		if(yearsUntilRetirement === "" ||  amountSavingPerMonth === "" || yearlyInterestRateOfInvestment === ""){
			error.text("One of your fields is empty!");
			error.show();
			e.preventDefault();
		}else if (yearsUntilRetirement < 0 || yearsUntilRetirement > 80 ||
					amountSavingPerMonth < 0 || amountSavingPerMonth > 10000000 ||
					yearlyInterestRateOfInvestment < 0 || yearlyInterestRateOfInvestment > .3){
			error.text("One of your fields is out of range!");
			error.show();
			e.preventDefault();
		}

	});
});
