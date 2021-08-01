import requests 
import pandas as pd
from numpy import random
from time import sleep
from list_creator import *
from typing import List

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}


def get_stock_list(income: int, investment_amount: int, num_stocks: int) -> List[dict]:
    '''
    Function the creates the final stock list
    Args:
        income: int that represents the income of the user
        investment_amount: int that represents the income of the user
        num_stocks: int representing the number of recommended stocks the user wants recommended
    Returns:
        List of dicts holding metadata about a list of stocks
        stock_dict = {
            'Name': str, 
            'Ticker': str, 
            'Sector': str,
            'Size': str (Mega, Large, Mid, Small, Micro), 
            'Market_Cap': str, 
            'DailyChange': str,
            'AnalystRecommendation': float (1=Strong buy, 5=Hard SelL), 

        }
    '''

    mega_cap_url = 'https://finviz.com/screener.ashx?v=111&f=cap_mega&r=41'
    mega_cap_perf_url = 'https://finviz.com/screener.ashx?v=141&f=cap_mega&r=41'

    large_cap_url = 'https://finviz.com/screener.ashx?v=111&f=cap_large,fa_curratio_o0.5,fa_epsyoy1_pos,fa_estltgrowth_pos,fa_roi_pos,ta_beta_u1&ft=3&o=-marketcap'
    large_cap_perf_url = 'https://finviz.com/screener.ashx?v=141&f=cap_large,fa_curratio_o0.5,fa_epsyoy1_pos,fa_estltgrowth_pos,fa_roi_pos,ta_beta_u1&ft=3&o=-marketcap'

    mid_cap_url = 'https://finviz.com/screener.ashx?v=111&f=cap_mid,fa_curratio_o0.5,fa_epsyoy1_pos,fa_estltgrowth_pos,fa_roi_pos,ta_beta_u1.5&ft=3&o=-marketcap'
    mid_cap_perf_url = 'https://finviz.com/screener.ashx?v=141&f=cap_mid,fa_curratio_o0.5,fa_epsyoy1_pos,fa_estltgrowth_pos,fa_roi_pos,ta_beta_u1.5&ft=3&o=-marketcap'

    small_cap_url = 'https://finviz.com/screener.ashx?v=111&f=cap_small,fa_curratio_o0.5,fa_eps5years_pos,fa_estltgrowth_pos,fa_roi_pos,ta_beta_u1.5&ft=3'
    small_cap_perf_url = 'https://finviz.com/screener.ashx?v=141&f=cap_small,fa_curratio_o0.5,fa_eps5years_pos,fa_estltgrowth_pos,fa_roi_pos,ta_beta_u1.5&ft=3'

    micro_cap_url = 'https://finviz.com/screener.ashx?v=111&f=cap_micro,fa_curratio_o0.5,fa_epsyoy1_pos,fa_estltgrowth_pos,fa_roi_pos&ft=2'
    micro_cap_perf_url = 'https://finviz.com/screener.ashx?v=141&f=cap_micro,fa_curratio_o0.5,fa_epsyoy1_pos,fa_estltgrowth_pos,fa_roi_pos&ft=2'

    mega_df = get_entire_df_from_url(url_overview=mega_cap_url, url_perf=mega_cap_perf_url)
    large_df = get_entire_df_from_url(url_overview=large_cap_url, url_perf=large_cap_perf_url)
    mid_df = get_entire_df_from_url(url_overview=mid_cap_url, url_perf=mid_cap_perf_url)
    small_df = get_entire_df_from_url(url_overview=small_cap_url, url_perf=small_cap_perf_url)
    micro_df = get_entire_df_from_url(url_overview=micro_cap_url, url_perf=micro_cap_perf_url)

    stock_list = create_final_stock_list(mega_df=mega_df, large_df=large_df, 
                        mid_df=mid_df, small_df=small_df, 
                        micro_df=micro_df, income=income,
                       investment_amount=investment_amount, num_stocks=num_stocks)

    return stock_list



def get_entire_df_from_url(url_overview: str, url_perf: str) -> pd.DataFrame:
    '''
    Function that gets df of all the finviz data from url
    Args:
        url_overview: str of url of overview page on finvize
        url_perf: str of url of performance page on finvize
    Returns:
        df of finviz data
    '''
    df = get_stock_df(url_overview=url_overview, url_perf=url_perf)
    next_index = 21
    while next_index <= 441:
        print('Current Index: {}'.format(next_index))
        sleeptime = random.uniform(0.5, 1)
        print("sleeping for:", sleeptime, "seconds")
        sleep(sleeptime)
        print("sleeping is over")

        next_ov_url = url_overview + '&r=' + str(next_index)
        next_perf_url = url_perf + '&r=' + str(next_index)
        next_df = get_stock_df(url_overview=next_ov_url, url_perf=next_perf_url)

        if len(next_df.index) <= 1:
            return df
        df = df.append(next_df, ignore_index=True)
           
        
        next_index += 20
    return df
        

def get_stock_df(url_overview: str, url_perf: str):
    '''
    Function that gets df the finviz data from url of one page of many
    Args:
        url_overview: str of url of overview page on finvize
        url_perf: str of url of performance page on finvize
    Returns:
        df of finviz data
    '''

    tables111 = get_screener(url=url_overview)
    tables141 = get_screener(url=url_perf)

    consolidatedtables = pd.merge(tables111, tables141,how='outer',left_on='Ticker',right_on='Ticker')

    return consolidatedtables


def get_screener(url: str):
    '''
    Function that gets df of the finviz data from individual url
    Args:
        url: str of finviz page
    Returns:
        df of finviz data
    '''

    screen = requests.get(url, headers = headers).text

    tables = pd.read_html(screen)
    tables = tables[-2]
    tables.columns = tables.iloc[0]
    tables = tables[1:]

    return tables



if __name__ =='__main__':
    stock_list = get_stock_list(income=100000, investment_amount=50000, num_stocks=100)
    #table = get_screener(url='https://finviz.com/screener.ashx?v=141&f=cap_large,fa_curratio_o0.5,fa_epsyoy1_pos,fa_estltgrowth_pos,fa_roi_pos,ta_beta_u1&ft=3&o=-marketcap&r=21')
    #print(table.head())






