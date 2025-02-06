interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;                                          {/* 1. Add blockchain property */}
}
  interface FormattedWalletBalance extends WalletBalance{
    {/*                                                          2. Can use extends to clean code 
    currency: string;
    amount: number;
    */}
    formatted: string;
  }
  
  interface Props extends BoxProps {
  
  }
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
      const getPriority = (blockchain: any): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            
            { /* const balancePriority = getPriority(balance.blockchain);           1. Missing property blockchain in WalletBalance
            if (lhsPriority > -99) {                                                3. lhsPriority is not defined, i think it is 
               if (balance.amount <= 0) {                                              balancePriority variable created above
                 return true;
               }
            }  */}

            (getPriority(balance.blockchain) > -99 && balance.amount<=0) ;          {/* 3. My solution  */}

          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            {/* 
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {                                     4. Here we can use Ternary Operator to easy  
              return -1;                                                               read and fix bugs
            } else if (rightPriority > leftPriority) {
              return 1;
            }    */}

            getPriority(lhs.blockchain) > getPriority(rhs.blockchain) ? -1 : 1;     {/*4. My solution */}
            
      });
    }, [balances, prices]);
  
    {/*
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {   5. formattedBalances value return like interface  
      return {                                                                   FormattedWalletBalance  so we can refactored it with 
        ...balance,                                                              FormattedWalletBalance[] to easy read, controll
        formatted: balance.amount.toFixed()                                      code
      }
    }) */}

                                                                                {/*5. My solution*/}
    const formattedBalances:FormattedWalletBalance[] = sortedBalances.map((balance: WalletBalance) => {    
        return {                                                                    
          ...balance,                                                              
          formatted: balance.amount.toFixed(2)                                      
        }
      })

    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }